"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    name: zod_1.z.string().min(2),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.scanSchema = zod_1.z.object({
    prompt: zod_1.z.string().min(1),
    checkType: zod_1.z.enum(['injection', 'pii', 'toxicity']).optional().default('injection'),
});
