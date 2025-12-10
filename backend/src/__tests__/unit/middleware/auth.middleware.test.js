"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = require("../../../middleware/auth.middleware");
jest.mock('jsonwebtoken');
const mockJwt = jsonwebtoken_1.default;
const createMockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
describe('authenticate middleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            header: jest.fn(),
        };
        res = createMockResponse();
        next = jest.fn();
        jest.clearAllMocks();
    });
    it('should return 401 if no token is provided', () => {
        req.header.mockReturnValue(undefined);
        (0, auth_middleware_1.authenticate)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Access denied. No token provided.' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should attach decoded user and call next for valid token', () => {
        req.header.mockReturnValue('Bearer valid-token');
        mockJwt.verify.mockReturnValue({ id: 'user-id' });
        (0, auth_middleware_1.authenticate)(req, res, next);
        expect(mockJwt.verify).toHaveBeenCalledWith('valid-token', process.env.JWT_SECRET || 'default_secret');
        expect(req.user).toEqual({ id: 'user-id' });
        expect(next).toHaveBeenCalled();
    });
    it('should return 401 for invalid token', () => {
        req.header.mockReturnValue('Bearer invalid-token');
        mockJwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });
        (0, auth_middleware_1.authenticate)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token.' });
        expect(next).not.toHaveBeenCalled();
    });
});
