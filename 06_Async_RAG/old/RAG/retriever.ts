import { QdrantVectorStore } from "@langchain/qdrant";
import { embedding } from "./embeddings.js";
import { config } from "../Config/config.js";

export const retriever = async (query: string) => {
    // 1. Get embedding model
    const embeddingsModel = embedding();

    // 2. Connect to existing Qdrant collection
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddingsModel,
        {
            url: config.qdrantUrl,
            collectionName: config.collectionName,
        }
    );

    console.log(`Retrieving context for query: "${query}"`);

    // 3. Perform similarity search (fetch top 4 results)
    const results = await vectorStore.similaritySearch(query, 4);

    // 4. Format the context for the LLM
    const context = results.map((doc) => {
        return `PageContent: ${doc.pageContent}  Page Number: ${doc.metadata.loc?.pageNumber ?? "Unknown"} FileLocation: ${doc.metadata.source ?? "unknown"}`;
    }).join("\n\n");

    return context;
};