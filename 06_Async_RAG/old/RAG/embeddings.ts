import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { config } from "../Config/config.js";

export const embedding = () => {
    const em = new OpenAIEmbeddings({
        model: "text-embedding-3-large",
        apiKey: config.openaiApiKey
    })

    return em;
}