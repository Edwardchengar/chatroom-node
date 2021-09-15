import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  PrimaryColumn
} from "typeorm";

@Entity("user")
export class UserEntity {
  constructor(
    userName: string,
    password: string,
    lastLoginTime: Date,
    token: string
  ) {
    this.userName = userName;
    this.password = password;
    this.lastLoginTime = lastLoginTime;
    this.token = token;
  }

  @ObjectIdColumn()
  id: ObjectID;

  @PrimaryColumn()
  userName: string;

  @Column()
  password: string;

  @Column()
  lastLoginTime: Date;

  @Column()
  token: string;

  @Column()
  socketId: string;
}
