import { Queue } from "bullmq";

export class RagQueue {
    private queue: Queue

    constructor() {
        this.queue = new Queue('rag-queue', {
            connection: {
                host: 'localhost',
                port: 6379
            }
        })
    }

    public async add(name: string, data: any) {
        return this.queue.add(name, data);
        //returning coz promise needs to be returned
    }

}