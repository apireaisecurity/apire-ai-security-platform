"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scan_controller_1 = require("../controllers/scan.controller");
const router = (0, express_1.Router)();
const scanController = new scan_controller_1.ScanController();
router.post("/scans", scanController.createScan.bind(scanController));
exports.default = router;
