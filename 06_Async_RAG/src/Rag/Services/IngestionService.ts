import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export class IngestionService {
    public async ingest(filePath: string) {

        const loader = new PDFLoader(filePath);
        const doc = await loader.load();
        const chunk = new RecursiveCharacterTextSplitter({
            chunkOverlap: 400,
            chunkSize: 1000
        })

        const splitter = await chunk.splitDocuments(doc);
        return splitter;
    }
}