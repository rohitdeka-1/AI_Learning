import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { config } from "../../Config/config.js";
import { Document } from "@langchain/core/documents";

export class VectorStore {
    private embeddingModel: GoogleGenerativeAIEmbeddings;

    constructor() {
        this.embeddingModel = new GoogleGenerativeAIEmbeddings({
            apiKey: config.geminiApiKey,
            model: "gemini-embedding-001",
        });
    }

    public async getContext(query: string): Promise<string> {
        console.log(`searching qdrant for ${query}`);

        const vector = await QdrantVectorStore.fromExistingCollection(
            this.embeddingModel,
            {
                url: config.qdrantUrl,
                collectionName: "gemini-db"
            }
        )

        const results = await vector.similaritySearch(
            query,
            4
        )

        const context = results.map((doc) => {
            return `PageContent: ${doc.pageContent} Metadata: ${doc.metadata} ${doc.metadata.loc?.pageNumber}`
        }).join('\n\n');

        return context;
    }

    public async saveDocument(doc: Document[]) {
        console.log("saving to qdrant")
        await QdrantVectorStore.fromDocuments(doc, this.embeddingModel,
            {
                url: config.qdrantUrl,
                collectionName: "gemini-db"
            }

        )
    }

}
