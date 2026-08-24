import Fastify, { type FastifyInstance } from "fastify"
import { envToLogger } from "./logger/logger.js"


export const buildApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({
    logger: envToLogger["development"] ?? true
  })

  return app;

}































































