import "dotenv/config";
import { buildApp } from "./app.js";
import { ragModule } from "./Rag/index.js";

const app = buildApp();
const start = async () => {
    app.register(ragModule, {
        prefix: '/api/v1',
    });

    try {
        await app.listen({ port: 3000 });
        console.log("Server listening on port 3000");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();