import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../../components/Dashboard/Dashboard';
import axios from 'axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as unknown as { post: ReturnType<typeof vi.fn> };

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure getItem returns some token so Authorization header is populated
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('fake-token');
  });

  it('renders prompt textarea and scan button', () => {
    render(<Dashboard />);

    expect(screen.getByPlaceholderText(/enter prompt to scan/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /scan prompt/i })).toBeInTheDocument();
  });

  it('calls backend and shows SAFE result with no flags', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        isSafe: true,
        flags: [],
      },
    });

    render(<Dashboard />);

    const textarea = screen.getByPlaceholderText(/enter prompt to scan/i);
    const button = screen.getByRole('button', { name: /scan prompt/i });

    fireEvent.change(textarea, { target: { value: 'test prompt' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/scanner',
        { prompt: 'test prompt', checkType: 'injection' },
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('Bearer'),
          }),
        }),
      );
    });

    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/safe/i)).toBeInTheDocument();
    expect(screen.queryByText(/flags:/i)).not.toBeInTheDocument();
  });

  it('shows UNSAFE result with flags list', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        isSafe: false,
        flags: ['prompt-injection', 'pii-detected'],
      },
    });

    render(<Dashboard />);

    const textarea = screen.getByPlaceholderText(/enter prompt to scan/i);
    const button = screen.getByRole('button', { name: /scan prompt/i });

    fireEvent.change(textarea, { target: { value: 'malicious prompt' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    expect(screen.getByText(/unsafe/i)).toBeInTheDocument();
    expect(screen.getByText(/flags:/i)).toBeInTheDocument();
    expect(screen.getByText(/prompt-injection/i)).toBeInTheDocument();
    expect(screen.getByText(/pii-detected/i)).toBeInTheDocument();
  });

  it('handles API errors gracefully (no crash)', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

    render(<Dashboard />);

    const textarea = screen.getByPlaceholderText(/enter prompt to scan/i);
    const button = screen.getByRole('button', { name: /scan prompt/i });

    fireEvent.change(textarea, { target: { value: 'whatever' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    // No error UI yet, but at least we log and don't throw
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
