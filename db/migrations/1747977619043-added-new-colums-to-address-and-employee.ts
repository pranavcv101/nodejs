import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewColumsToAddressAndEmployee1747977619043 implements MigrationInterface {
    name = 'AddedNewColumsToAddressAndEmployee1747977619043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying DEFAULT 'LINE2' `);
        // await queryRunner.query(`UPDATE  TABLE "address" SET "line2" = 'line2' where "line2" IS NULL`);
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" SET NOT NULL`);


        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying DEFAULT 'house_no' `);
        // await queryRunner.query(`UPDATE  TABLE "address" SET "house_no" = 'house_no' where "house_no" IS NULL`);
        // await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying DEFAULT '000'`);
        // await queryRunner.query(`UPDATE  TABLE "employee" SET "employee_id" = 'employee_id' where "employee_id" IS NULL`);
        // await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "house_no" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP DEFAULT '2025-01-01' `);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer DEFAULT 0 `);
        await queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'PROBATION'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
    }

}
