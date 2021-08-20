import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  PrimaryColumn
} from "typeorm";

@Entity("user")
export class UserEntity {
  constructor(userName: string, password: string, isOnline: boolean) {
    this.userName = userName;
    this.password = password;
    this.isOnline = isOnline;
  }

  @ObjectIdColumn()
  id: ObjectID;

  @PrimaryColumn()
  userName: string;

  @Column()
  password: string;

  @Column()
  isOnline: boolean;
}
