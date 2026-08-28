import { type FastifyInstance } from "fastify";
import type { RagController } from "../Controller/RagController.js";

const questionSchema = {
    body: {
        type: 'object',
        required: ['question'],
        properties: {
            question: { type: 'string', maxLength: 500 }
        }
    }
}

export const ragRoutes = (controller: RagController) => async (app: FastifyInstance) => {
    app.post('/ask-question', { schema: questionSchema }, controller.ask);
    app.post('/ingest', controller.ingest);
}