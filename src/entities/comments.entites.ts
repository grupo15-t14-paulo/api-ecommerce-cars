import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./cars.entities";
import { User } from "./users.entities";

@Entity("comments")
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", nullable: true })
  comment: string;

  @ManyToOne(() => Car, (car) => car.comments)
  car: Car;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
