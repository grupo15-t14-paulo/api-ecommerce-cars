import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 255 })
  street: string;

  @Column({ type: "varchar", length: 9 })
  cep: string;

  @Column({ type: "varchar", length: 11 })
  number: string;

  @Column({ type: "varchar", length: 20 })
  city: string;

  @Column({ type: "varchar", length: 150 })
  state: string;

  @Column({ type: "text", nullable: true })
  complement: string | null;
}
