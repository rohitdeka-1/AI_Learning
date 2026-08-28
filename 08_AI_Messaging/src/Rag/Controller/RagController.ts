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
            const filePath = req.body as { path: string };
            const question = body.question;

            if (!question) {
                return reply.status(400).send({
                    success: "false",
                    error: "Question is required"
                })
            }

            if (!filePath) {
                return reply.status(400).send({
                    success: "false",
                    error: "File path needed"
                })
            }
            const answer = await this.ragService.askQuestion(question);
            return reply.status(200).send({
                success: "true",
                answer: answer
            })
        } catch (err) {
            console.log("error : ", err);
        }
    }

}