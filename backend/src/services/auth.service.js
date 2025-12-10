"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
class AuthService {
    async register(input) {
        const existingUser = user_model_1.users.find((u) => u.email === input.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        // In a real app, use bcrypt to hash password
        const hashedPassword = crypto_1.default.createHash('sha256').update(input.password).digest('hex');
        const newUser = {
            id: crypto_1.default.randomUUID(),
            email: input.email,
            password: hashedPassword,
            name: input.name,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        user_model_1.users.push(newUser);
        const token = this.generateToken(newUser);
        const { password, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword, token };
    }
    async login(input) {
        const hashedPassword = crypto_1.default.createHash('sha256').update(input.password).digest('hex');
        const user = user_model_1.users.find((u) => u.email === input.email && u.password === hashedPassword);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user);
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    }
}
exports.AuthService = AuthService;
