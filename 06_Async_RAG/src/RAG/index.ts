import { ingestion } from "./Ingestion.js";
import { embedding } from "./embeddings.js";
import { initializeVectorStore } from "./vectorStore.js";
import { retriever } from "./retriever.js";
import { generator } from "./generator.js";

export const ragPipeline = async () => {
    try {
        console.log("Starting RAG Pipeline (Data Ingestion & Storage)...");

        console.log("1. Ingesting documents...");
        const documents = await ingestion();

        console.log("2. Initializing embeddings model...");
        const embeddingsModel = embedding();

        console.log("3. Storing documents in vector store...");
        const vectorStore = await initializeVectorStore(documents, embeddingsModel);

        return vectorStore;
    } catch (error) {
        console.error("Error in RAG Pipeline:", error);
        throw error;
    }
};

export const askQuestion = async (query: string) => {
    try {
        console.log(`Starting RAG Query Pipeline for: "${query}"`);
        
        // 1. Retrieve relevant context
        const context = await retriever(query);
        
        // 2. Generate answer
        const answer = await generator(query, context);
        
        return answer;
    } catch (error) {
        console.error("Error asking question:", error);
        throw error;
    }
};

// Also export them individually in case you want to use them separately
export { retriever, generator };
