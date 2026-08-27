import http from "node:http";
import { Redis } from "ioredis";
import { Server } from "socket.io";
import { RagQueue } from "../Worker/RagQueue.js";


export class SocketService {
    private io: Server;
    private subscriber: Redis
    private queue: RagQueue

    constructor(httpServer: http.Server, queue: RagQueue) {
        this.io = new Server(httpServer, {
            cors: {
                origin: "*"
            }
        })
        this.subscriber = new Redis({ host: 'localhost', port: 6379 });
        this.queue = queue;
    }

    public startSocketServer() {

        this.subscriber.on("message", (channel, message) => {
            console.log("channel:", channel);
            console.log("Message:", message);

            if (channel.startsWith("answer:")) {
                const socketId = channel.split(":")[1];
                console.log("Routing to socket:", socketId);

                this.io.to(socketId as any).emit("answer", JSON.parse(message));
            }

            if (channel.startsWith("msgfor:")) {
                const receiverId = channel.split(":")[1];
                console.log("sending message to ", receiverId);
                this.io.to(receiverId as any).emit("msg", message);
            }

        })

        this.io.on("connection", async (socket) => {
            console.log("socket connect with id ", socket.id);

            await this.subscriber.subscribe(`answer:${socket.id}`)

            socket.on("ask-question", async (data: any) => {
                await this.queue.add('question', { socketId: socket.id, data })
            })

            await this.subscriber.subscribe(`msgfor:${socket.id}`);

            socket.on("send-message", async (data: any) => {
                const payload = typeof data == "string" ? JSON.parse(data) : data;
                console.log("RECEIVED SEND-MESSAGE, receiverId is:", payload.receiverId);
                await this.queue.add('chat', { socketId: socket.id, receiverId: payload.receiverId, msg: payload.msg })
            })

            socket.on("disconnect", () => {
                console.log("socket disconnected : ", socket.id);
            })
        })

    }

}