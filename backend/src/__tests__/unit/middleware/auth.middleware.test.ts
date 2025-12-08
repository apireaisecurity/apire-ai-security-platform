import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate, AuthRequest } from '../../../middleware/auth.middleware';

jest.mock('jsonwebtoken');

const mockJwt = jwt as jest.Mocked<typeof jwt>;

const createMockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authenticate middleware', () => {
  let req: AuthRequest;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    } as unknown as AuthRequest;
    res = createMockResponse();
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided', () => {
    (req.header as jest.Mock).mockReturnValue(undefined);

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access denied. No token provided.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should attach decoded user and call next for valid token', () => {
    (req.header as jest.Mock).mockReturnValue('Bearer valid-token');
    mockJwt.verify.mockReturnValue({ id: 'user-id' } as any);

    authenticate(req, res, next);

    expect(mockJwt.verify).toHaveBeenCalledWith(
      'valid-token',
      process.env.JWT_SECRET || 'default_secret',
    );
    expect(req.user).toEqual({ id: 'user-id' });
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 for invalid token', () => {
    (req.header as jest.Mock).mockReturnValue('Bearer invalid-token');
    mockJwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token.' });
    expect(next).not.toHaveBeenCalled();
  });
});
