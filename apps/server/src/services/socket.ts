import { Server, Socket } from "socket.io";

import { RedisService } from "./redis";

export interface Task {
  content: string;
  sender: user;
  // LastDate: Date;
  reciever: user;
  title: string;
}

export interface message {
  content: string;
  sender: user;
  roomName: string;
}
interface user {
  name: string;
  avatar: string | null;
  id: string;
}

export interface INotification {
  content: string;
  sender: user;
  reciever: user;
}

class SocketService {
  private _io: Server;
  private redisPubSub: RedisService;
  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    this.redisPubSub = new RedisService(this.io);
    console.log("init Socket Server...");
  }

  public initializeSocketEvents() {
    const io = this.io;

    io.on("connect", (socket: Socket) => {
      console.log(`New Socket connected ${socket.id}`);

      socket.on("joinRoom", async (roomName: string, callback: Function) => {
        await this.joinRoom(socket, roomName);
        callback({
          status: true,
        });
      });

      socket.on(
        "sendtask",
        async (roomName: string, task: Task, callback: Function) => {
          await this.redisPubSub.publishTaskToRoom(roomName, task);
          callback({
            status: true,
          });
        }
      );

      socket.on(
        "sendMessage",
        async (roomName: string, message: message, callback: Function) => {
          const res = await this.publish(roomName, message);

          callback({
            status: res,
          });
        }
      );

       
      socket.on(
        "sendNotification",
        async (roomName: string, Notification: INotification, callback: Function) => {
          await this.redisPubSub.publishNotificationToRoom(roomName, Notification);
          callback({
            status: true,
          });
        }
      );
    });

    console.log("InIt Socket Listners");
  }

  private async joinRoom(socket: Socket, roomName: string): Promise<void> {
    socket.join(roomName);
    await this.redisPubSub.subscribeToRoom(roomName);

    this.io.to(roomName).emit("userjoined", `new SocketID emit ${socket.id}`);

    console.log("with custom hook");

    // this.io.to(roomName).emit("userJoined" , socket.id , roomName)
    console.log(` socketid is  ${socket.id} joined room: ${roomName}`);
  }

  private async publish(roomName: string, message: message) {
    const res = await this.redisPubSub.publishToRoom(roomName, message);
    return res;
  }

  get io() {
    return this._io;
  }
}

export { SocketService };
