import express from "express";
import env from "dotenv";
import setUpMongoConnection from "./services/MongoUtil";
import userRouter from "./routes/userRoute";
import { Response } from "./model/response";
const app = express();

env.config();
app.use(express.json());

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});

setUpMongoConnection();

app.get("/", (req, res) => {
  res.send("Well done!");
});
app.use("/user", userRouter);
app.use((error: Response, req, res, next) => {
  console.log(error);
  console.log("Error Handling Middleware called");
  console.log("Path: ", req.path);
  res.status(error.statusCode).send(error);
});
export default app;
