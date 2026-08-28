import { Queue } from 'bullmq'

export class RagQueue {
    private myQueue: Queue;
    constructor() {
        this.myQueue = new Queue('rag-queue', {
            connection: {
                host: 'localhost',
                port: '6379',
            }
        });
    }

    async addJob(name: string, data: any) {
        return await this.myQueue.add(name, data);
    }
}