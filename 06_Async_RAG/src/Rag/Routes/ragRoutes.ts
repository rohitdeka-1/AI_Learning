import { type FastifyInstance } from "fastify";
import { RagQueue } from "../../Queue/RagQueue.js";
import { RagController } from "../Controller/ragController.js";


export const ragRoutes = async (app: FastifyInstance, controller: RagController) => {
    app.post('/ask', (req, reply) => controller.askQuestion(req, reply));
}