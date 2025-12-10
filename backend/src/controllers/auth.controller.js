"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const validators_1 = require("../utils/validators");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const validation = validators_1.registerSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ error: validation.error.errors });
            }
            const result = await authService.register(validation.data);
            res.status(201).json(result);
        }
        catch (error) {
            if (error.message === 'User already exists') {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async login(req, res) {
        try {
            const validation = validators_1.loginSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ error: validation.error.errors });
            }
            const result = await authService.login(validation.data);
            res.status(200).json(result);
        }
        catch (error) {
            if (error.message === 'Invalid credentials') {
                return res.status(401).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async me(req, res) {
        // User is attached to req by auth middleware
        const user = req.user;
        res.status(200).json(user);
    }
}
exports.AuthController = AuthController;
