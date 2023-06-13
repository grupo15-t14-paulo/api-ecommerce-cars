import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1686615833728 implements MigrationInterface {
    name = 'CreateUser1686615833728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "REL_d25f1ea79e282cc8a42bd616aa"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "REL_d25f1ea79e282cc8a42bd616aa" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
