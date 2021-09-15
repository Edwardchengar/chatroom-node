import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { UserEntity } from "../entities/UserEntity";
import { sign } from "jsonwebtoken";

export class UserService {
  bcryptHashRound: number = 10;
  userRepository: Repository<UserEntity>;
  constructor(repo: Repository<UserEntity>) {
    this.userRepository = repo;
  }

  signIn = async (userName: string, password: string) => {
    const user = await this.userRepository.findOne({ userName: userName });
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        const currentTime = new Date();
        const siginInResult = {
          token: this.getToken(userName),
          lastLoginTime: currentTime
        };
        await this.userRepository.update({ userName: userName }, siginInResult);
        return siginInResult;
      }
    }
    return null;
  };

  signOut = async (userName: string) => {
    try {
      await this.userRepository.update(
        { userName: userName },
        { token: null, socketId: null }
      );
      return true;
    } catch (e) {
      console.log("error when signOut : " + e);
      return false;
    }
  };

  signUp = async (userName: string, password: string) => {
    try {
      const encryptedPw = await bcrypt.hash(password, this.bcryptHashRound);

      const newUser = new UserEntity(userName, encryptedPw, null, null);
      await this.userRepository.save(newUser);
      return true;
    } catch (e) {
      console.log("UserService|error " + e.message);
      throw e;
    }
  };

  getToken = (username: string): string => {
    const currentTime = new Date();
    const token = sign(
      { userName: username, loginTime: currentTime },
      process.env.PRIVATE_KEY,
      { expiresIn: "1h" }
    );
    return token;
  };
}
