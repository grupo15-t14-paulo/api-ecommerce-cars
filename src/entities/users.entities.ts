import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Address } from "./address.entities";
import { Car } from "./cars.entities";
import { Comments } from "./comments.entites";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 14, unique: true })
  cpf: string;

  @Column({ length: 15, unique: true })
  tel: string;

  @Column({ type: "date" })
  dateBirth: string | Date;

  @Column({ type: "text", nullable: true })
  description: string | null | undefined;

  @Column({ default: false })
  isSeller: boolean;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Car, (car) => car.user, { cascade: true })
  @JoinColumn()
  announcement?: Car[];

  @OneToMany(() => Comments, (coments) => coments.user, { cascade: true })
  @JoinColumn()
  comments?: Comments[];

  @Column({ nullable: true })
  reset_token: string;
}
