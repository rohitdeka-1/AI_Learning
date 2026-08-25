import Fastify, { type FastifyInstance } from "fastify"
import { envToLogger } from "./logger/logger.js"
import { askQuestion } from "./RAG/index.js"

export const buildApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({
    logger: envToLogger["development"] ?? true
  })

  return app;

}































































