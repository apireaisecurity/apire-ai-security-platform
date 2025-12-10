"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_controller_1 = require("../controllers/test.controller");
const router = (0, express_1.Router)();
const testController = new test_controller_1.TestController();
router.post("/tests", testController.createTest.bind(testController));
router.get("/tests/:id", testController.getTest.bind(testController));
exports.default = router;
