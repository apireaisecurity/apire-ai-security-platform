"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const test_routes_1 = __importDefault(require("./routes/test.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
// Health Check
app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "apire-prompt-shield-api" });
});
app.use("/api/v1", auth_middleware_1.authenticate, test_routes_1.default);
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
exports.default = app;
