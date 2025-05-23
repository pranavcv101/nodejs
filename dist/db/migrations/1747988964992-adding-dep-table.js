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
exports.AddingDepTable1747988964992 = void 0;
class AddingDepTable1747988964992 {
    constructor() {
        this.name = 'AddingDepTable1747988964992';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "department_id" integer`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT '2025-01-01 00:00:00'`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET DEFAULT '000'`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" SET DEFAULT 'house_no'`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" SET DEFAULT 'LINE2'`);
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
            yield queryRunner.query(`DROP TABLE "department"`);
        });
    }
}
exports.AddingDepTable1747988964992 = AddingDepTable1747988964992;
//# sourceMappingURL=1747988964992-adding-dep-table.js.map