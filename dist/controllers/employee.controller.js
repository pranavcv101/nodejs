"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("../exception/httpException"));
const class_transformer_1 = require("class-transformer");
const create_employee_dto_1 = require("../dto/create-employee.dto");
const class_validator_1 = require("class-validator");
// import { authorizationMiddleware } from "../middleware/authorization.middleware"
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const employee_entity_1 = require("../entities/employee.entity");
class EmployeeController {
    // private employeeService: EmployeeServices;
    // constructor(employeeService : EmployeeServices) {
    //     this.employeeService = employeeService;
    // }
    //shortcut for this above three  lines
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const updatedvalue = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updatedvalue);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                yield this.employeeService.updateEmployee(id, updatedvalue);
                res.status(204).send();
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.employeeService.deleteEmployee(id);
            res.status(205).send();
        });
        router.get("/", this.getallEmployees.bind(this));
        router.post("/", (0, authorization_middleware_1.checkRoles)(employee_entity_1.EmployeeRole.HR), this.createEmployee.bind(this)); //bind used to bind the method to the employee controller classs
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", (0, authorization_middleware_1.checkRoles)(employee_entity_1.EmployeeRole.HR), this.updateEmployee); // bind not required because wwe defined updateemployee as arrrow function
        router.delete("/:id", (0, authorization_middleware_1.checkRoles)(employee_entity_1.EmployeeRole.HR), this.deleteEmployee);
    }
    createEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                console.log(req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto.email, createEmployeeDto.name, createEmployeeDto.age, createEmployeeDto.role, createEmployeeDto.address, createEmployeeDto.password, createEmployeeDto.employeeId, createEmployeeDto.experience, createEmployeeDto.dateOfJoining, createEmployeeDto.status, createEmployeeDto.departmentId);
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getallEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        });
    }
    getEmployeeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.getEmployeeById(Number(req.params.id));
                if (!employee)
                    // throw new Error('Employee not found')
                    throw new httpException_1.default(400, "employee not found");
                res.status(200).send(employee);
            }
            catch (err) {
                // res.status(400).send("not found")
                console.log(err);
                next(err);
            }
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map