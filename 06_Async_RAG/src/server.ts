import { buildApp } from "./app.js"
import { RagQueue } from "./Queue/RagQueue.js";
import { RagController } from "./Rag/Controller/ragController.js";
import { ragRoutes } from "./Rag/Routes/ragRoutes.js";
import { RagService } from "./Rag/Services/RagService.js";
import { SocketService } from "./Socket/SocketService.js";

const start = async () => {
    const app = await buildApp();
    const ragService = new RagService();
    const queue = new RagQueue();
    const ragController = new RagController(queue);
    const sockerService = new SocketService(app.server, queue);

    sockerService.registerEvents();

    app.register(ragRoutes, {
        prefix: '/api/v1',
        controller: ragController
    });

    try {
        const filePath = "C:/Users/alkar/Downloads/Print _ Udyam Registration Certificate.pdf";
        await ragService.setupDb(filePath);

        await app.listen({ port: 3001 });

    } catch (err) {
        app.log.error(err);
    }
}

start();