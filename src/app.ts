import express from "express";
import env from "dotenv";
import setUpMongoConnection from "./util/MongoConnection";
import userRouter from "./routes/userRoute";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { ChatServices } from "./services/ChatServices";
import { JwtPayload, verify } from "jsonwebtoken";
import { ChatRequest } from "./model/ChatRequest";

const app = express();

env.config();
app.use(express.json());

// MongoDb connection and redis conncection;
setUpMongoConnection();

// router part
app.use("/user", userRouter);

// error handling Middleware
app.use((error: Response, req, res, next) => {
  console.log(
    "Error Handling Middleware called" +
      "Error : " +
      error +
      "Path: " +
      req.path
  );
  res.send(error);
});

// websocket support part
const websocketServer = createServer(app);

const io = new Server(websocketServer, {
  path: "/websocket",
  cors: {
    origin: "https://amritb.github.io", // for testing only, pending to remove
    methods: ["GET", "POST"]
  }
});
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    verify(token, process.env.PRIVATE_KEY) as JwtPayload;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

io.on("connection", (socket: Socket) => {
  let username: string;
  const decodedToken = verify(
    socket.handshake.auth.token,
    process.env.PRIVATE_KEY
  ) as JwtPayload;
  if (decodedToken.userName) {
    username = decodedToken.userName;
  }

  const chat = new ChatServices(socket, redis.getClient());

  if (username) {
    chat.initSocket(username);
  } else {
    console.log("io|connection|no username is found");
  }

  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });

  socket.on("to", (data: ChatRequest) => {
    chat.sendMessage(data);
  });
});

websocketServer.listen(3001);

// app.listen(3000, () => {
//   console.log("The application is listening on port 3000!");
// });

export default app;
