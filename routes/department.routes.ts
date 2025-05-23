import express from "express"
import DepartmentRepostory from "../repositories/department.repository";
import datasource from "../db/data-source";
import Department from "../entities/department.entity";
import DepartmentService from "../services/department.service";
import EmployeeController from "../controllers/employee.controller";
import DepartmentController from "../controllers/department.controller";


const departmentRouter = express.Router();

const departmentRepository = new DepartmentRepostory(datasource.getRepository(Department))
const departmentService = new DepartmentService(departmentRepository);
new DepartmentController(departmentService,departmentRouter);

export default departmentRouter;
export {departmentService};