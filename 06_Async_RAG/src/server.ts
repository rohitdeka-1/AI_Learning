import { buildApp } from "./app.js"
import { RagQueue } from "./Queue/RagQueue.js";
import { RagService } from "./Rag/Services/RagService.js";

const start = async () => {
    const app = await buildApp();
    const ragService = new RagService();
    const queue = new RagQueue();

    try {
        await app.listen({ port: 3000 });

        const filePath = "C:/Users/alkar/Downloads/Print _ Udyam Registration Certificate.pdf";

        const queryArr = ["what is this pdf about?", "what is the rg number", "who is rohit"];


        await ragService.setupDb(filePath);

        for (const item of queryArr) {
            const job = await queue.addJob('ask-question', {
                query: item
            });
            app.log.info(`Job sent with id : ${job.id}`);
        }

    } catch (err) {
        app.log.error(err);
    }
}

start();