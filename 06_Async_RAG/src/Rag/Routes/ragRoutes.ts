import { type FastifyInstance } from "fastify";
import { RagController } from "../Controller/ragController.js";

interface RouteOpts {
    controller: RagController;
}

export const ragRoutes = async (app: FastifyInstance, opts: RouteOpts) => {
    app.post('/ask', (req, reply) => opts.controller.askQuestion(req, reply));
}