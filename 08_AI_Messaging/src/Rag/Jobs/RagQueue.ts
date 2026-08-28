import { Queue } from "bullmq";

export class RagQueue {
    private ragQueue: Queue;
    constructor() {
        this.ragQueue = new Queue('rag-queue', {
            connection: {
                host: 'localhost',
                port: '6173',
            }
        });
    }
    public async addJob(jobName: string, job: any) {
        return this.ragQueue.add(jobName, job);
    }
}