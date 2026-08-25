import OpenAI from "openai";

export class LlmService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI();
        console.log("LLM Service Initialized")
    }

    public async generateAnswer(query: string, context: string): Promise<string | null | undefined> {
        const SYSTEM_PROMPT = "YOU ARE A HELPFUL AI ASSISTANT WHO ANSWERS USER QUERY BASED ON THE AVAILABLE CONTEXT FROM PDF, DONT ANSWER ANYTHING ELSE";

        const completions = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `context: ${context} query: ${query} ` }
            ]
        });

        return completions.choices[0]?.message.content;
    }
}