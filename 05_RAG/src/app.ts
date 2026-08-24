import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant"
import 'dotenv/config'
import { retrieve } from "./retrieval.js";

export const sytem = async () => {

    const file = "C:/Users/alkar/Downloads/Print _ Udyam Registration Certificate.pdf";
    const loader = new PDFLoader(file);
    const doc = await loader.load();
    console.log(doc);

    //split
    const splitter = new RecursiveCharacterTextSplitter({
        chunkOverlap: 10,
        chunkSize: 50
    });
    //semantic chunking

    //chunk
    const chunk = await splitter.splitDocuments(doc);

    //Vector Embedding
    const embeddingModel = new OpenAIEmbeddings({
        model: "text-embedding-3-large",
        apiKey: process.env.OPENAI_API_KEY
    });

    //vector Store
    const vectorStore = await QdrantVectorStore.fromDocuments(
        chunk,
        embeddingModel,
        {
            url: "http://localhost:6333",
            collectionName: "my_documents",
        }
    )



    await retrieve();

}