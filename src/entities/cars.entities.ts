import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Image } from "./image.entities";

export enum fuel {
  DIESEL = "Diesel",
  ETANOL = "Etanol",
  GASOLINA = "Gasolina",
  DEFAULT = "Não informado",
}

@Entity("cars")
export class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  brand: string;

  @Column({ type: "varchar", length: 100 })
  model: string;

  @Column({ type: "varchar", length: 100 })
  year: string;

  @Column({ type: "enum", enum: fuel, default: fuel.DEFAULT })
  typeCar: fuel;

  @Column({ type: "integer" })
  mileage: number;

  @Column({ type: "varchar", length: 100 })
  color: string;

  @Column({ type: "float" })
  fipePrice: number;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "text", nullable: true })
  description: string | undefined | null;

  @Column({ type: "varchar", length: 250 })
  imageCover: string;

  @Column({ type: "boolean", default: true })
  isAvailable: boolean | undefined | null;

  @OneToMany(() => Image, (image) => image.car)
  images: Image[];
}
