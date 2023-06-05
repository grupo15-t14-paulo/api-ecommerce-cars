import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCar1686004826280 implements MigrationInterface {
    name = 'CreateCar1686004826280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cars_typecar_enum" AS ENUM('Diesel', 'Etanol', 'Gasolina', 'Não informado')`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "year" character varying(100) NOT NULL, "typeCar" "public"."cars_typecar_enum" NOT NULL DEFAULT 'Não informado', "mileage" integer NOT NULL, "color" character varying(100) NOT NULL, "fipePrice" double precision NOT NULL, "price" double precision NOT NULL, "description" text, "imageCover" character varying(250) NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "urlImage" character varying(255) NOT NULL, "carId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_c966d343d95687961368797192e" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_c966d343d95687961368797192e"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TYPE "public"."cars_typecar_enum"`);
    }

}
