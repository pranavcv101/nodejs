import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.services";
import EmployeeRepository from "../repositories/employee.repository";
import { employeeService } from "./employee.route";
import employeeRouter from "../employee_router";


const authRouter = express.Router();

// const repository = datasource.getRepository(Employee)
// const employeeRepository = new EmployeeRepository(repository)


const authService = new AuthService(employeeService);
new AuthController(authService,authRouter)

export default authRouter;