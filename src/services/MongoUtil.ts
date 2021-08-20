import { createConnection } from "typeorm";
import { UserEntity } from "../entites/UserEntity";
const setUpMongoConnection = async () => {
  await createConnection({
    type: "mongodb",
    url: process.env.MONGODB_URI_LOCAL,
    entities: [UserEntity]
  });
};

export default setUpMongoConnection;
