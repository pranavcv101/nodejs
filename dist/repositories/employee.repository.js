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
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(employee);
        });
    }
    findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                relations: {
                    address: true,
                    department: true
                }
            });
        });
    }
    findOneBy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id },
                relations: {
                    address: true,
                    department: true
                }
            });
        });
    }
    findbyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOneBy({ email });
        });
    }
    remove(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            // const employee = await this.repository.findOneBy({id:empId});
            yield this.repository.softRemove(employee);
        });
    }
    update(id, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.save(Object.assign({ id }, employee)); // ...this is spread operaion
        });
    }
}
exports.default = EmployeeRepository;
//# sourceMappingURL=employee.repository.js.map