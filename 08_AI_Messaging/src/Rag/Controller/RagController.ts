import type { FastifyReply, FastifyRequest } from "fastify";
import type { RagService } from "../Services/RagServices.js"

export class RagController {
    private ragService: RagService;

    constructor(ragService: RagService) {
        this.ragService = ragService
    }

    public ask = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const body = req.body as { question: string };
            const question = body.question;
            if (!question) {
                return reply.status(400).send({
                    success: "false",
                    error: "Question is required"
                })
            }
            const answer = await this.ragService.askQuestion(question);
            return reply.status(200).send({
                success: "true",
                answer: answer
            })
        } catch (err) {
            console.log("error : ", err);
            return reply.status(500).send({ error: "Internal server error" });
        }
    }

    public ingest = async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const body = req.body as { filePath: string };
            const filePath = body.filePath;

            if (!filePath) {
                return reply.status(400).send({
                    success: "false",
                    error: "filePath is required"
                })
            }

            await this.ragService.chunker(filePath);

            return reply.status(200).send({
                success: "true",
                message: "PDF successfully chunked and saved to Qdrant!"
            })
        } catch (err) {
            console.log("error : ", err);
            return reply.status(500).send({ error: "Internal server error" });
        }
    }
}