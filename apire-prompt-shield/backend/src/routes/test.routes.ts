import { Router } from 'express';
import { TestController } from '../controllers/test.controller';

const router = Router();
const testController = new TestController();

router.post('/tests', testController.createTest.bind(testController));
router.get('/tests/:id', testController.getTest.bind(testController));

export default router;
