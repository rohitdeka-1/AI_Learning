import type { FastifyReply, FastifyRequest } from "fastify";
import type { RagQueue } from "../../Queue/RagQueue.js";

export class RagController {
    private queue: RagQueue;

    constructor(queue: RagQueue) {
        this.queue = queue;
    }

    async askQuestion(request: FastifyRequest, reply: FastifyReply) {
        const { query } = request.body as { query: string };
        const job = await this.queue.addJob("ask-question", {
            query
        });

        return reply.send({
            jobId: job.id,
            message: "Job queue!"
        });
    }
}