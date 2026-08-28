import openAI from "openai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
// Note: Assuming you're using this based on the Qdrant langchain package. 
// If you don't have `@qdrant/js-client-rest` installed, you might need to adjust this.
import { QdrantClient } from "@qdrant/js-client-rest";
import { RagRepository } from "./Repository/RagRepository.js";
import { LlmService } from "./Services/LLmService.js";
import { RagService } from "./Services/RagServices.js";
import { RagController } from "./Controller/RagController.js";
import { ragRoutes } from "./Routes/index.js";
import { RagWorkerManager, RagWorkerManager } from "./Jobs/RagWorker.js";

// --- 1. Module-Specific Setup ---
const geminiClient = new openAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const qdrantBaseClient = new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY!,
});

const embeddingsClient = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY!,
    modelName: "embedding-001"!,
});

const qdrantVectorStore = new QdrantVectorStore(embeddingsClient, {
    client: qdrantBaseClient,
    collectionName: "rhd_new_collection",
});


// --- 2. Wiring the Layered Architecture ---
const ragRepository = new RagRepository(qdrantVectorStore, embeddingsClient);
const llmService = new LlmService(geminiClient);
const ragService = new RagService(ragRepository, llmService);
const ragController = new RagController(ragService);
const ragWorkerManager = new RagWorkerManager(ragService);
ragWorkerManager.startWorker();

// --- 3. Exposing the Module via Fastify Plugin ---
// We pass the configured controller into the route definitions
export const ragModule = ragRoutes(ragController);
