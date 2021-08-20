import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { UserEntity } from "../entites/UserEntity";

const bcryptHashRound = 10;

export const signIn = async (username: string, password: string) => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne({ userName: username });
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      await userRepository.update({ userName: username }, { isOnline: true });
      return true;
    }
  }
  return false;
};

export const signOut = async (username: string) => {
  const userRepository = getRepository(UserEntity);
  try {
    await userRepository.update({ userName: username }, { isOnline: false });
    return true;
  } catch (e) {
    console.log("error when signOut : " + e);
    return false;
  }
};

export const signUp = async (userName: string, password: string) => {
  try {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ userName: userName });
    if (user) {
      throw new Error("already has user");
    } else {
      const encryptedPw = await bcrypt.hash(password, bcryptHashRound);
      const newUser = new UserEntity(userName, encryptedPw, false);
      await userRepository.save(newUser);
      return true;
    }
  } catch (e) {
    console.log("UserService|error " + e.message);
    throw e;
  }
};
