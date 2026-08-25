import fastify from "fastify";
import { envToLogger } from "./logger/logger.js";

export const buildApp = () => {
    const app = fastify({
        logger: envToLogger["development"]
    })

    return app;
}

