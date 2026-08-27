import { Worker } from "bullmq";
import { Redis } from "ioredis";

const publisher = new Redis({
    host: 'localhost',
    port: 6379
})
const worker = new Worker("rag-queue", async (job) => {
    if (job.name == "chat") {
        const { receiverId, msg } = job.data;

        publisher.publish(`msgfor:${receiverId}`, msg);

    }

}, { connection: { host: 'localhost', port: 6379 } })


worker.on("completed", () => {
    console.log("worker done");
});