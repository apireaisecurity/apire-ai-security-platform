import { Request, Response } from 'express';
import { ScannerController } from '../../../controllers/scanner.controller';
import { ScannerService } from '../../../services/scanner.service';

jest.mock('../../../services/scanner.service');

const MockScannerService = ScannerService as jest.MockedClass<typeof ScannerService>;

const createMockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('ScannerController', () => {
  let controller: ScannerController;
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    controller = new ScannerController();
    req = { body: {} };
    res = createMockResponse();
    jest.clearAllMocks();
  });

  it('should return 400 for invalid request body', async () => {
    req.body = { invalid: 'data' };

    await controller.scan(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    const [[responseBody]] = (res.json as jest.Mock).mock.calls;
    expect(responseBody).toHaveProperty('error');
  });

  it('should return 200 with scan result for valid body', async () => {
    const scanResult = { isSafe: true };
    (MockScannerService.prototype.scan as jest.Mock).mockResolvedValue(scanResult);

    req.body = { prompt: 'test', checkType: 'injection' } as any;

    await controller.scan(req as Request, res);

    expect(MockScannerService.prototype.scan).toHaveBeenCalledWith({
      prompt: 'test',
      checkType: 'injection',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(scanResult);
  });

  it('should return 500 on unexpected error', async () => {
    (MockScannerService.prototype.scan as jest.Mock).mockRejectedValue(new Error('boom'));

    req.body = { prompt: 'test', metadata: {} };

    await controller.scan(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
