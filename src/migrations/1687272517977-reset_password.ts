import { MigrationInterface, QueryRunner } from "typeorm";

export class ResetPassword1687272517977 implements MigrationInterface {
    name = 'ResetPassword1687272517977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password"`);
    }

}
