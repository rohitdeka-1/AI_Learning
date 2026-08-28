import { type FastifyInstance } from "fastify";
import type { RagController } from "../Controller/RagController.js";

export const ragRoutes = (controller: RagController) => async (app: FastifyInstance) => {
    app.post('/ask-question', controller.ask);
    app.post('/ingest', controller.ingest);
}