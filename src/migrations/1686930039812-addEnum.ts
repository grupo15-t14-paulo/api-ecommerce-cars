import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnum1686930039812 implements MigrationInterface {
    name = 'AddEnum1686930039812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."cars_typecar_enum" RENAME TO "cars_typecar_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."cars_typecar_enum" AS ENUM('Diesel', 'Etanol', 'Gasolina', 'Flex', 'Híbrido', 'Não informado')`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "typeCar" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "typeCar" TYPE "public"."cars_typecar_enum" USING "typeCar"::"text"::"public"."cars_typecar_enum"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "typeCar" SET DEFAULT 'Não informado'`);
        await queryRunner.query(`DROP TYPE "public"."cars_typecar_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cars_typecar_enum_old" AS ENUM('Diesel', 'Etanol', 'Gasolina', 'Não informado')`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "typeCar" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "typeCar" TYPE "public"."cars_typecar_enum_old" USING "typeCar"::"text"::"public"."cars_typecar_enum_old"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "typeCar" SET DEFAULT 'Não informado'`);
        await queryRunner.query(`DROP TYPE "public"."cars_typecar_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."cars_typecar_enum_old" RENAME TO "cars_typecar_enum"`);
    }

}
