import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Car } from "./cars.entities";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  urlImage: string;

  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({ name: "carId" })
  car: Car;
}
