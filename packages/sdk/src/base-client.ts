/**
 * Base HTTP client with error handling and retries
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import {
  ApireError,
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  NotFoundError,
  RateLimitError,
  NetworkError,
  TimeoutError,
  ServerError,
} from './errors';
import { ApiResponse, RequestConfig } from './types/common';

export interface BaseClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

export class BaseClient {
  protected axios: AxiosInstance;
  protected config: BaseClientConfig & { timeout: number; retries: number; retryDelay: number; headers: Record<string, string> };

  constructor(config: BaseClientConfig) {
    this.config = {
      timeout: 30000,
      retries: 3,
      retryDelay: 1000,
      headers: {},
      ...config,
    };

    this.axios = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
        ...(this.config.apiKey && { 'X-API-Key': this.config.apiKey }),
      },
    });

    // Response interceptor for error handling
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    );
  }

  /**
   * Make a request with automatic error handling and retries
   */
  protected async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      method: config.method,
      url: config.path,
      data: config.data,
      params: config.params,
      headers: config.headers,
      timeout: config.timeout || this.config.timeout,
    };

    try {
      const response = await this.retryRequest(axiosConfig);
      return {
        success: true,
        data: response.data,
        metadata: {
          requestId: response.headers['x-request-id'],
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      if (error instanceof ApireError) {
        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
            statusCode: error.statusCode,
          },
          metadata: {
            timestamp: new Date().toISOString(),
          },
        };
      }
      throw error;
    }
  }

  /**
   * Retry logic with exponential backoff
   */
  private async retryRequest(config: AxiosRequestConfig, attempt: number = 1): Promise<any> {
    try {
      return await this.axios.request(config);
    } catch (error) {
      const isRetryable = this.isRetryableError(error as AxiosError);
      if (attempt < this.config.retries && isRetryable) {
        const delay = this.config.retryDelay * Math.pow(2, attempt - 1);
        await this.sleep(delay);
        return this.retryRequest(config, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: AxiosError): boolean {
    if (!error.response) return true; // Network error
    const status = error.response.status;
    return status === 408 || status === 429 || (status >= 500 && status < 600);
  }

  /**
   * Handle Axios errors and convert to Apire errors
   */
  private handleError(error: AxiosError): never {
    if (error.code === 'ECONNABORTED') {
      throw new TimeoutError('Request timeout', this.config.timeout);
    }

    if (!error.response) {
      throw new NetworkError('Network error - unable to reach server', error);
    }

    const { status, data } = error.response;
    const message = (data as any)?.message || error.message;
    const details = (data as any)?.details;

    switch (status) {
      case 400:
        throw new ValidationError(message, details);
      case 401:
        throw new AuthenticationError(message, details);
      case 403:
        throw new AuthorizationError(message, details);
      case 404:
        throw new NotFoundError('Resource', (data as any)?.id);
      case 429:
        throw new RateLimitError(message, (data as any)?.retryAfter);
      case 408:
        throw new TimeoutError(message);
      default:
        if (status >= 500) {
          throw new ServerError(message, status, details);
        }
        throw new ApireError(message, 'UNKNOWN_ERROR', status, details);
    }
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
