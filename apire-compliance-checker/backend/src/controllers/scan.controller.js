"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanController = void 0;
const scan_service_1 = require("../services/scan.service");
const scanService = new scan_service_1.ScanService();
class ScanController {
    async createScan(req, res) {
        try {
            const { config, frameworks } = req.body;
            if (!config || !frameworks) {
                return res.status(400).json({ error: "Missing config or frameworks" });
            }
            const result = await scanService.runScan(config, frameworks);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.ScanController = ScanController;
