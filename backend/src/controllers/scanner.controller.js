"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScannerController = void 0;
const scanner_service_1 = require("../services/scanner.service");
const validators_1 = require("../utils/validators");
const scannerService = new scanner_service_1.ScannerService();
class ScannerController {
    async scan(req, res) {
        try {
            const validation = validators_1.scanSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ error: validation.error.errors });
            }
            const result = await scannerService.scan(validation.data);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.ScannerController = ScannerController;
