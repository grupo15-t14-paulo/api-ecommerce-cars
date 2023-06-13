import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1686614702076 implements MigrationInterface {
    name = 'CreateUser1686614702076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a383ac5d1cc34720ea56a937a13" UNIQUE ("tel")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a383ac5d1cc34720ea56a937a13"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`);
    }

}
