"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_controller_1 = require("../../../controllers/scanner.controller");
const scanner_service_1 = require("../../../services/scanner.service");
jest.mock('../../../services/scanner.service');
const MockScannerService = scanner_service_1.ScannerService;
const createMockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
describe('ScannerController', () => {
    let controller;
    let req;
    let res;
    beforeEach(() => {
        controller = new scanner_controller_1.ScannerController();
        req = { body: {} };
        res = createMockResponse();
        jest.clearAllMocks();
    });
    it('should return 400 for invalid request body', async () => {
        req.body = { invalid: 'data' };
        await controller.scan(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
        const [[responseBody]] = res.json.mock.calls;
        expect(responseBody).toHaveProperty('error');
    });
    it('should return 200 with scan result for valid body', async () => {
        const scanResult = { isSafe: true };
        MockScannerService.prototype.scan.mockResolvedValue(scanResult);
        req.body = { prompt: 'test', checkType: 'injection' };
        await controller.scan(req, res);
        expect(MockScannerService.prototype.scan).toHaveBeenCalledWith({
            prompt: 'test',
            checkType: 'injection',
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(scanResult);
    });
    it('should return 500 on unexpected error', async () => {
        MockScannerService.prototype.scan.mockRejectedValue(new Error('boom'));
        req.body = { prompt: 'test', metadata: {} };
        await controller.scan(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});
