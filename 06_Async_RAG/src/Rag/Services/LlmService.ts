import OpenAI from "openai";
import { config } from "../../Config/config.js";

export class LlmService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: config.geminiApiKey,
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
        });
        console.log("LLM Service Initialized with Gemini!")
    }

    public async generateAnswer(query: string, context: string): Promise<string | null | undefined> {
        const SYSTEM_PROMPT = "YOU ARE A HELPFUL AI ASSISTANT WHO ANSWERS USER QUERY BASED ON THE AVAILABLE CONTEXT FROM PDF, DONT ANSWER ANYTHING ELSE";

        const completions = await this.openai.chat.completions.create({
            model: "gemini-1.5-flash",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `context: ${context} query: ${query} ` }
            ]
        });

        return completions.choices[0]?.message.content;
    }
}