import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const ingestion = async () => {
    const file = "C:/Users/alkar/Downloads/Print _ Udyam Registration Certificate.pdf";
    const loader = new PDFLoader(file);
    const doc = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
        chunkOverlap: 50,
        chunkSize: 100
    });

    const chunk = await splitter.splitDocuments(doc);
    return chunk;

}