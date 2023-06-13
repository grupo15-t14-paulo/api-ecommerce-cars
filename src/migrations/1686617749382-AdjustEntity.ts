import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustEntity1686617749382 implements MigrationInterface {
    name = 'AdjustEntity1686617749382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "zipCode" TO "cep"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "cep" TO "zipCode"`);
    }

}
