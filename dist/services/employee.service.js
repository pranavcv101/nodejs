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
const department_entity_1 = __importDefault(require("../entities/department.entity"));
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.logger = logger_service_1.LoggerService.getInstance(EmployeeService.name);
    }
    createEmployee(email, name, age, role, address, password, employeeId, experience, dateOfJoining, status, departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            const newAddress = new address_entity_1.default();
            const dep = new department_entity_1.default();
            dep.id = departmentId;
            newAddress.line1 = address.line1;
            newAddress.line2 = address.line2;
            newAddress.houseNo = address.houseNo;
            newAddress.pincode = address.pincode;
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.role = role;
            newEmployee.employeeId = employeeId;
            newEmployee.experience = experience;
            newEmployee.dateOfJoining = dateOfJoining;
            newEmployee.status = status;
            newEmployee.department = dep;
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
                const dep = new department_entity_1.default();
                dep.id = updatedEmployee.departmentId;
                employee.name = updatedEmployee.name;
                employee.email = updatedEmployee.email;
                employee.age = updatedEmployee.age;
                employee.experience = updatedEmployee.experience;
                employee.employeeId = updatedEmployee.employeeId;
                employee.dateOfJoining = updatedEmployee.dateOfJoining;
                employee.status = updatedEmployee.status;
                employee.role = updatedEmployee.role;
                newAddress.id = existingEmployee.address.id; // this is done so to keep the addres id same or it would crate new id
                newAddress.line1 = updatedEmployee.address.line1;
                newAddress.line2 = updatedEmployee.address.line2;
                newAddress.pincode = updatedEmployee.address.pincode;
                newAddress.houseNo = updatedEmployee.address.houseNo;
                employee.address = newAddress;
                employee.department = dep;
                yield this.employeeRepository.update(id, employee);
            }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findOneBy(id);
            if (existingEmployee) {
                yield this.employeeRepository.remove(existingEmployee);
            }
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