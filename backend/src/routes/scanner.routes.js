"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scannerRoutes = void 0;
const express_1 = require("express");
const scanner_controller_1 = require("../controllers/scanner.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
exports.scannerRoutes = router;
const scannerController = new scanner_controller_1.ScannerController();
// Protected route - only authenticated users can scan
router.post('/', auth_middleware_1.authenticate, scannerController.scan);
