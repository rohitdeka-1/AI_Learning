import { buildApp } from "./index.js";
import { askQuestion, ragPipeline } from "./RAG/index.js";


const start = async (): Promise<void> => {
    const app = await buildApp();

    try {
        app.listen({ port: 3000 }, async () => {
            app.log.info("Server is running on port 3000")
            app.log.info("Ask Question :");
            const ques = "What is the registration number?"

            await ragPipeline();

            const answer = await askQuestion(ques);
            console.log("FINAL ANSWER: ", answer);


        })
    } catch (err) {
        app.log.error("Error: " + err)
    }
}

start();


