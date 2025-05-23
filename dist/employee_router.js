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
const express_1 = __importDefault(require("express"));
const employee_entity_1 = __importDefault(require("./entities/employee.entity"));
const data_source_1 = __importDefault(require("./db/data-source"));
const employeeRouter = express_1.default.Router();
employeeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employees = yield employeeRepository.find();
    res.status(200).send(employees);
}));
employeeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = Number(req.params["id"]);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.findOneBy({ id: empId });
    if (!employee) {
        res.status(404).send("Employee not found");
        return;
    }
    res.status(200).send(employee);
}));
employeeRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const newEmployee = new employee_entity_1.default();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.insert(newEmployee);
    // console.log(`hello this is te new employeeee ${employee}`)
    res.status(200).send(newEmployee);
}));
employeeRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    employeeRepository.delete({ id: Number(req.params["id"]) });
    // const employeeIdxToDelete = employees.findIndex(
    //   (emp) => emp.id === Number(req.params["id"]),
    // );
    // employees.splice(employeeIdxToDelete, 1);
    res.status(200).send();
}));
employeeRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const empId = Number(req.params["id"]);
    yield employeeRepository.update({ id: empId }, req.body);
    console.log("update employees");
    res.status(200).send(yield employeeRepository.findOneBy({ id: empId }));
}));
exports.default = employeeRouter;
//# sourceMappingURL=employee_router.js.map