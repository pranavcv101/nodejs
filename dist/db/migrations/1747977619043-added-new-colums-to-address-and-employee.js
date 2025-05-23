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
exports.AddedNewColumsToAddressAndEmployee1747977619043 = void 0;
class AddedNewColumsToAddressAndEmployee1747977619043 {
    constructor() {
        this.name = 'AddedNewColumsToAddressAndEmployee1747977619043';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying DEFAULT 'LINE2' `);
            // await queryRunner.query(`UPDATE  TABLE "address" SET "line2" = 'line2' where "line2" IS NULL`);
            // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying DEFAULT 'house_no' `);
            // await queryRunner.query(`UPDATE  TABLE "address" SET "house_no" = 'house_no' where "house_no" IS NULL`);
            // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying DEFAULT '000'`);
            // await queryRunner.query(`UPDATE  TABLE "employee" SET "employee_id" = 'employee_id' where "employee_id" IS NULL`);
            // await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "house_no" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP DEFAULT '2025-01-01' `);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer DEFAULT 0 `);
            yield queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'PROBATION'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
            yield queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        });
    }
}
exports.AddedNewColumsToAddressAndEmployee1747977619043 = AddedNewColumsToAddressAndEmployee1747977619043;
//# sourceMappingURL=1747977619043-added-new-colums-to-address-and-employee.js.map