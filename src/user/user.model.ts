import { generateSalt, hashPassword } from "../utils";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @BeforeInsert()
  async hashPassword() {
    this.salt = generateSalt();
    this.password = hashPassword(this.password, this.salt);
  }

};
