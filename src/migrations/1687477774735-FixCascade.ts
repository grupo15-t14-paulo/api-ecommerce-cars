import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCascade1687477774735 implements MigrationInterface {
    name = 'FixCascade1687477774735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(255) NOT NULL, "cep" character varying(9) NOT NULL, "number" character varying(11) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(150) NOT NULL, "complement" text, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "urlImage" character varying(255) NOT NULL, "carId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "cpf" character varying(14) NOT NULL, "tel" character varying(15) NOT NULL, "dateBirth" date NOT NULL, "description" text, "isSeller" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "reset_token" character varying, "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_a383ac5d1cc34720ea56a937a13" UNIQUE ("tel"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cars_typecar_enum" AS ENUM('Diesel', 'Etanol', 'Gasolina', 'Flex', 'Híbrido', 'Não informado')`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "year" character varying(100) NOT NULL, "typeCar" "public"."cars_typecar_enum" NOT NULL DEFAULT 'Não informado', "mileage" integer NOT NULL, "color" character varying(100) NOT NULL, "fipePrice" double precision NOT NULL, "price" double precision NOT NULL, "description" text, "imageCover" character varying(250) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "isAvailable" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_c966d343d95687961368797192e" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_6431b6fec12c4090bb357fba2c2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_6431b6fec12c4090bb357fba2c2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_c966d343d95687961368797192e"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TYPE "public"."cars_typecar_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
