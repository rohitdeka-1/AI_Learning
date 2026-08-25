import { Document } from "@langchain/core/documents";
import { Embeddings } from "@langchain/core/embeddings";
import { QdrantVectorStore } from "@langchain/qdrant";
import { config } from "../Config/config.js";

export const initializeVectorStore = async (
    documents: Document[],
    embeddingsModel: Embeddings
): Promise<QdrantVectorStore> => {
    try {
        console.log(`Inserting ${documents.length} chunks into Qdrant...`);
        const store = await QdrantVectorStore.fromDocuments(
            documents,
            embeddingsModel,
            {
                url: config.qdrantUrl,
                collectionName: config.collectionName,
            }
        );
        console.log("Successfully inserted data into Qdrant!");
        return store;
    } catch (error) {
        console.error("Failed to insert documents into vector store", error);
        throw error;
    }
};