import { Worker } from "bullmq";
import { RagService } from "../Rag/Services/RagService.js";
import { Redis } from "ioredis";

const ragService = new RagService();
const publisher = new Redis({
    host: 'localhost',
    port: 6379
})

const worker = new Worker('rag-queue', async (job) => {

    console.log(`Job ${job.id} picked up the question ${job.data.query} `);
    console.log(job.data)
    console.log("rohit")
    const ans = await ragService.askQuestion(job.data.query);
    await publisher.publish(`answer:${job.data.socketId}`, JSON.stringify(ans));
    return ans;

}, {
    connection: {
        host: 'localhost',
        port: 6379
    }
})

worker.on('completed', (job, returnvalue) => {
    console.log(`Job ${job.id} has completed `);
    console.log(`the returned answer : ${returnvalue} `)
})

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} has failed with error:`, err.message);
})
