import { Redis } from "ioredis";
import { Socket } from "socket.io";
import { ChatRequest } from "../model/ChatRequest";

export class ChatServices {
  socket: Socket;
  redis: Redis;
  constructor(socket: Socket, redis: Redis) {
    this.socket = socket;
    this.redis = redis;
  }

  initSocket = async (username: string) => {
    try {
      if (this.redis && this.socket && this.socket.id) {
        await this.redis.set(username, this.socket.id);
      } else {
        throw new Error("initSocket fail");
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  sendMessage = async (request: ChatRequest) => {
    try {
      const socketId = await this.redis.get(request.receipt);
      if (!socketId) {
        throw new Error("no suitable recepit");
      }
      this.socket.to(socketId).emit("to", request.message);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
