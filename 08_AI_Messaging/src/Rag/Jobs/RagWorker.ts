import { Redis } from "ioredis";
import { Job, Worker } from "bullmq";
import { RagService } from "../Services/RagServices.js";


export class RagWorkerManager {

    private ragService: RagService;
    private publisher: Redis;

    constructor(ragService: RagService) {
        this.ragService = ragService
        this.publisher = new Redis({
            host: 'localhost',
            port: 6379
        })
    }
    public startWorker() {

        const worker = new Worker("rag-queue", async (job: Job) => {
            if (job.name == "chat") {
                const { receiverId, msg } = job.data;

                const answer = await this.ragService.askQuestion(msg);
                this.publisher.publish(`msgfor:${receiverId}`, JSON.stringify(answer));

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
    }
}