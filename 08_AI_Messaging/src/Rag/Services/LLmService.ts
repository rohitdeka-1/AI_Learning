import openAI from "openai";

export class LlmService {
    private geminiClient: openAI;

    constructor(geminiClient: openAI) {
        this.geminiClient = geminiClient;
    }

    public async ans(context: string) {

        const systemPrompt = `
                You are a helpful PDF assistant.
                Rules:
                - Answer only using the provided context.
                - If the answer is not present in the context, say you don't know.
                - Do not make up information.
        `;

        let val = await this.geminiClient.chat.completions.create({
            model: "gemini-3.6-flash",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: context }
            ]
        })

        return val.choices[0]?.message.content;
    }
}