import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import type { RagRepository } from "../Repository/RagRepository.js";
import { type LlmService } from "./LLmService.js";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
export class RagService {
    private ragRepository: RagRepository
    private llmService: LlmService
    constructor(ragRepository: RagRepository, llmService: LlmService) {
        this.ragRepository = ragRepository;
        this.llmService = llmService;
    }

    public async askQuestion(question: string) {
        const relevantDocs = await this.ragRepository.search(question);

        const contextText = relevantDocs.map((doc) => {
            return doc.pageContent
        }).join("\n\n");

        const context = `You are a pdf solver you can answer anything from the pdf answer everything only from the pdf here is the context: ${contextText} and the question is question:${question} `;

        const val = await this.llmService.ans(context);
        return val;
    }

    public async chunker(filePath: string) {
        const loader = new PDFLoader(filePath);
        const doc = await loader.load()
        const chunk = new RecursiveCharacterTextSplitter({
            chunkOverlap: 400,
            chunkSize: 1000
        })

        const splitter = await chunk.splitDocuments(doc);

        this.ragRepository.saveToQdrant(splitter);

    }

}