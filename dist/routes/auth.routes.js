"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_services_1 = require("../services/auth.services");
const employee_route_1 = require("./employee.route");
const authRouter = express_1.default.Router();
// const repository = datasource.getRepository(Employee)
// const employeeRepository = new EmployeeRepository(repository)
const authService = new auth_services_1.AuthService(employee_route_1.employeeService);
new auth_controller_1.AuthController(authService, authRouter);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map