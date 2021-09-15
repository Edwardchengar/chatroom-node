import { Socket } from "socket.io";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { ChatRequest } from "../model/ChatRequest";

export class ChatServices {
  socket: Socket;
  userRepository: Repository<UserEntity>;
  constructor(socket: Socket, repo: Repository<UserEntity>) {
    this.socket = socket;
    this.userRepository = repo;
  }

  initSocket = async (userName: string) => {
    try {
      if (this.socket && this.socket.id) {
        await this.userRepository.update(
          { userName: userName },
          { socketId: this.socket.id }
        );
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
      const user = await this.userRepository.findOne({
        userName: request.receipt
      });
      const socketId = user.socketId;
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
