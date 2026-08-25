import { Worker } from "bullmq";
import { RagService } from "../Rag/Services/RagService.js";

const ragService = new RagService();


const worker = new Worker('rag-queue', async (job) => {

    console.log(`Job ${job.id} picked up the question ${job.data.query} `);
    console.log(job.data)
    const ans = await ragService.askQuestion(job.data.query);
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
