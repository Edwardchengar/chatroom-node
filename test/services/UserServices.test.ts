import { UserEntity } from "../../src/entities/UserEntity";
import { UserService } from "../../src/services/UserService";
import bcrypt from "bcrypt";
import { getRepository, UpdateResult } from "typeorm";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync("abc", salt);
const user = new UserEntity("test", hash, new Date(), null);

jest.mock("typeorm", () => {
  const actual = jest.requireActual("typeorm");
  return {
    ...actual,
    getRepository: jest.fn().mockImplementation(() => {
      const original = jest.requireActual("typeorm");
      return {
        ...original
      };
    })
  };
});

const mockedRepo = getRepository(UserEntity);
mockedRepo.findOne = jest.fn().mockResolvedValue(user);
mockedRepo.update = jest.fn().mockResolvedValue(new UpdateResult());

describe("Test UserService", function () {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      PRIVATE_KEY: "fjhasgdu11t"
    }; // Make a copy
  });
  test("test signIn success", function () {
    const service = new UserService(mockedRepo);
    return service.signIn("test", "abc").then((signInRes) => {
      expect(typeof signInRes).toEqual("object");
      expect(signInRes).toHaveProperty("token");
      expect(signInRes).toHaveProperty("lastLoginTime");
    });
  });
  test("test signIn fail", function () {
    const service = new UserService(mockedRepo);
    return service.signIn("test1", "abc").then((signInRes) => {
      expect(signInRes).toHaveProperty("token");
      expect(signInRes).toHaveProperty("lastLoginTime");
    });
  });
});
