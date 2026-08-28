import { Redis } from "ioredis";
import { Worker } from "bullmq";
const publisher = new Redis({
    host: 'localhost',
    port: 6379
})

const worker = new Worker("rag-queue", async (job) => {
    if (job.name == "chat") {
        const { receiverId, msg } = job.data;

        publisher.publish(`msgfor:${receiverId}`, msg);

    }
}, {
    connection: {
        host: 'localhost',
        port: 6379
    }
})

worker.on("completed", () => {
    console.log("worker completed the job")
})

worker.on("failed", () => {
    console.log("Worker Failed")
})