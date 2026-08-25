import { IngestionService } from "./IngestionService.js"
import { LlmService } from "./LlmService.js";
import { VectorStore } from "./VectorStore.js";

export class RagService {

    private ingestionService: IngestionService;
    private vectorStore: VectorStore;
    private LlmService: LlmService;

    constructor() {
        this.LlmService = new LlmService();
        this.ingestionService = new IngestionService();
        this.vectorStore = new VectorStore();
    }

    public async setupDb(filePath: string) {
        const ingest = await this.ingestionService.ingest(filePath);
        await this.vectorStore.saveDocument(ingest);
    }

    public async askQuestion(query: string): Promise<string | null | undefined> {

        const context = await this.vectorStore.getContext(query);
        const answer: (string | null | undefined) = await this.LlmService.generateAnswer(query, context);
        return answer;
    }

}