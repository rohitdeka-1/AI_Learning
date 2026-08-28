import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";

export class RagRepository {
    private qdrantClient: QdrantVectorStore
    private embeddingClient: GoogleGenerativeAIEmbeddings


    constructor(qdrantClient: QdrantVectorStore, embeddingClient: GoogleGenerativeAIEmbeddings) {
        this.qdrantClient = qdrantClient;
        this.embeddingClient = embeddingClient;

    }

    public async search(question: string) {
        const result = await this.qdrantClient.similaritySearch(question, 3);
        return result;
    }

    public async saveToQdrant(chunks: Document[]) {
        await this.qdrantClient.addDocuments(chunks);
    }

}
