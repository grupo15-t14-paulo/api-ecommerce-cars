import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnLenghts1686859149949 implements MigrationInterface {
    name = 'UpdateColumnLenghts1686859149949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "cep" character varying(9) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf" character varying(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a383ac5d1cc34720ea56a937a13"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tel"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tel" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a383ac5d1cc34720ea56a937a13" UNIQUE ("tel")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dateBirth"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dateBirth" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dateBirth"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dateBirth" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a383ac5d1cc34720ea56a937a13"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tel"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tel" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a383ac5d1cc34720ea56a937a13" UNIQUE ("tel")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "cep" character varying(8) NOT NULL`);
    }

}
