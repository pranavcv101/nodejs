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
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const address_entity_1 = __importDefault(require("../entities/address.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_service_1 = require("./logger.service");
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.logger = logger_service_1.LoggerService.getInstance(EmployeeService.name);
    }
    createEmployee(email, name, age, role, address, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            const newAddress = new address_entity_1.default();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.role = role;
            newEmployee.address = newAddress;
            newEmployee.password = yield bcrypt_1.default.hash(password, 10);
            return this.employeeRepository.create(newEmployee);
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findMany();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeRepository.findOneBy(id);
            if (!employee) {
                throw new Error("Employee not found");
            }
            return employee;
        });
    }
    updateEmployee(id, updatedEmployee) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findOneBy(id);
            if (existingEmployee) {
                const employee = new employee_entity_1.default();
                const newAddress = new address_entity_1.default();
                employee.name = updatedEmployee.name;
                employee.email = updatedEmployee.email;
                employee.age = updatedEmployee.age;
                newAddress.line1 = updatedEmployee.address.line1;
                newAddress.pincode = updatedEmployee.address.pincode;
                employee.address = newAddress;
                yield this.employeeRepository.update(id, employee);
            }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.employeeRepository.delete(id);
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findbyEmail(email);
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map