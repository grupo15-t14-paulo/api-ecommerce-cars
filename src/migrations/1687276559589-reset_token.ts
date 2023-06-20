import { MigrationInterface, QueryRunner } from "typeorm";

export class ResetToken1687276559589 implements MigrationInterface {
    name = 'ResetToken1687276559589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "reset_password" TO "reset_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "reset_token" TO "reset_password"`);
    }

}
