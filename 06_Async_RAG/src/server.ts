import { buildApp } from "./app.js"
import { RagService } from "./Rag/Services/RagService.js";

const start = async () => {
    const app = await buildApp();
    const ragService = new RagService();

    try {
        await app.listen({ port: 3000 });

        const filePath = "C:/Users/alkar/Downloads/Print _ Udyam Registration Certificate.pdf";
        const query = "what is this pdf about?"

        await ragService.setupDb(filePath);
        const ans = await ragService.askQuestion(query);
        app.log.info(ans);

    } catch (err) {
        app.log.error(err);
    }
}

start();