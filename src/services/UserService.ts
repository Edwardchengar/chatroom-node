import { getRepository, Repository } from "typeorm";
import bcrypt from "bcrypt";
import { UserEntity } from "../entites/UserEntity";
import { sign } from "jsonwebtoken";
import { PRIVATE_KEY } from "../util/ChatConstant";

export class UserService {
  bcryptHashRound: number;
  userRepository: Repository<UserEntity>;
  constructor() {
    this.bcryptHashRound = 10;
    this.userRepository = getRepository(UserEntity);
  }

  signIn = async (userName: string, password: string) => {
    const user = await this.userRepository.findOne({ userName: userName });
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        const currentTime = new Date();
        const token = sign(
          { userName: userName, loginTime: currentTime },
          PRIVATE_KEY
        );
        await this.userRepository.update(
          { userName: userName },
          { token: token, lastLoginTime: currentTime }
        );
        return true;
      }
    }
    return false;
  };

  signOut = async (userName: string) => {
    try {
      await this.userRepository.update({ userName: userName }, { token: null });
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
}
