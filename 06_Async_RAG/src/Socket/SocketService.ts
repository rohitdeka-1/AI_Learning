import { Server } from "socket.io";
import { Redis } from "ioredis";
import http from "http";
import type { RagQueue } from "../Queue/RagQueue.js";
import { json } from "stream/consumers";


export class SocketService {
    private io: Server;
    private subscriber: Redis;
    private queue: RagQueue

    constructor(httpServer: http.Server, queue: RagQueue) {
        this.queue = queue;
        this.io = new Server(httpServer, {
            cors: { origin: "*" }
        });
        this.subscriber = new Redis({
            host: 'localhost',
            port: 6379
        })
    }

    public registerEvents() {

        this.subscriber.on("message", (channel, message) => {
            const socketId = channel.split(":")[1];
            const data = JSON.parse(message);

            this.io.to(socketId as string).emit("answer", { data })

        })


        this.io.on("connection", async (socket) => {

            // User A
            // socket.id = abc

            // User B
            // socket.id = xyz

            // User C
            // socket.id = pqr

            console.log("Socket connected ", socket.id);

            this.subscriber.subscribe(`answer:${socket.id}`);

            socket.on("ask-question", async (data: any) => {
                let parsedData;
                if (typeof data == "string") {
                    parsedData = JSON.parse(data);
                } else {
                    parsedData = data;
                }
                await this.queue.addJob("ask-question", {
                    query: parsedData.query,
                    socketId: socket.id
                })
            });

            socket.on("disconnect", () => {
                this.subscriber.unsubscribe(`answer:${socket.id}`);
                console.log("socket disconnected", socket.id)
            })

        });

    }

}