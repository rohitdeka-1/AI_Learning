import { OpenAI } from "openai";

export const generator = async (query: string, context: string) => {
    const SYSTEM_PROMPT = "YOU ARE A HELPFUL AI ASSISTANT WHO ANSWERES USER QUERY BASED ON THE AVAILABLE CONTEXT FROM PDF, DONT ANSWER ANYTHING ELSE";

    const openai = new OpenAI();

    console.log("Generating response from OpenAI...");
    const completions = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `context: ${context} query: ${query} ` }
        ]
    });

    return completions.choices[0]?.message.content;
};
