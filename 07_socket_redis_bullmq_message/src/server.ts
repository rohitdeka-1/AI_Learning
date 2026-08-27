import { buildApp } from "./app.js";
import { SocketService } from "./Socket/SocketService.js";
import { RagQueue } from "./Worker/RagQueue.js";
import "./Worker/WorkerService.js";

const app = buildApp();
const start = async () => {
    try {

        const queue = new RagQueue();
        const socketService = new SocketService(app.server, queue);
        socketService.startSocketServer();
        await app.listen({ port: 5001 });
        console.log(`server startred`);
    } catch (err) {
        console.error("error", err);
    }
}

start();

