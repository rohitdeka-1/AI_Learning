import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { config } from "../../Config/config.js";
import { Document } from "langchain";

export class VectorStore {
    private embeddingModel: OpenAIEmbeddings;

    constructor() {
        this.embeddingModel = new OpenAIEmbeddings({
            model: "text-embedding-3-large",
            apiKey: config.openaiApiKey,
        });
    }

    public async getContext(query: string): Promise<string> {
        console.log(`searching qdrant for ${query}`);

        const vector = await QdrantVectorStore.fromExistingCollection(
            this.embeddingModel,
            {
                url: config.qdrantUrl,
                collectionName: "oops"
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
                collectionName: "oops"
            }

        )
    }

}
