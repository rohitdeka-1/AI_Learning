import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import "dotenv/config"
import { logger } from "./logger.js";
import openai, { OpenAI } from "openai";

export const retrieve = async () => {

    //Embedding model (same model used during indexing)
    const embeddingModel = new OpenAIEmbeddings({
        model: "text-embedding-3-large",
    });

    //connect to existing Qdrant collection
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddingModel,
        {
            url: "http://localhost:6333",
            collectionName:"my_documents"
        }
    );
    
    const query = "what is my registration number"
    //bm25

    console.log("The results")
    const result = await vectorStore.similaritySearch(
        query,
        4
    )

    //context
    const context = result.map((doc) => {
        return `PageContent: ${doc.pageContent}  Page Number: ${doc.metadata.loc?.pageNumber ?? "Unknown"} FileLocation: ${doc.metadata.source ?? "unknown"}`;
    }).join("\n\n");



    const SYSTEM_PROMPT = "YOU ARE A HELPFUL AI ASSISTANT WHO ANSWERES USER QUERY BASED ON THE AVAILABLE CONTEXT FROM PDF, DONT ANSWER ANYTHING ELSE";

    const openai = new OpenAI();
    const completions = await openai.chat.completions.create({
        model:"gpt-4o-mini",
        messages: [
            { role : "system", content: SYSTEM_PROMPT },
            { role : "user", content: `context: ${context} query: ${query} ` }
        ]
    })
    
    logger.info(result);
    logger.info(completions);

}
