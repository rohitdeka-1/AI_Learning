import "dotenv/config";
import { buildApp } from "./app.js";
import { ragModule } from "./Rag/index.js";
import { initializeSockets } from "./Infrastructure/Socket/index.js";

const app = buildApp();
const start = async () => {
    app.register(ragModule, {
        prefix: '/api/v1',
    });

    try {
        initializeSockets(app.server);
        await app.listen({ port: 5001 });


        console.log("Server started");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();