import { Server } from "socket.io";
import http from "http"
import { RagQueue } from "../../Rag/Jobs/RagQueue.js";
import { Redis } from "ioredis";

export class SocketService {
    private io: Server
    private queue: RagQueue
    private subscriber: Redis
    constructor(httpServer: http.Server, queue: RagQueue, subscriber: Redis) {
        this.io = new Server(httpServer, {
            cors: { origin: "*" }
        });
        this.queue = queue;
        this.subscriber = subscriber
    }

    public async startSocket() {

        this.subscriber.on("message", (channel, message) => {
            if (channel.startsWith("chat-message")) {
                const socketId = channel.split(":")[1];
                this.io.to(socketId as any).emit("msg", JSON.parse(message))
            }
        })

        this.io.on("connection", (socket) => {
            console.log("socket connected with Id: ", socket.id);

            this.subscriber.subscribe(`chat-message:${socket.id}`);

            socket.on("chatwithAi", async (data: any) => {
                let parsedData = typeof data == "string" ? JSON.parse(data) : data;
                await this.queue.addJob("chat", { ...parsedData, socketId: socket.id });
            })

            socket.on("disconnect", () => {

                this.subscriber.unsubscribe(`chat-message:${socket.id}`);
            })
        })

    }

}