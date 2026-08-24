import "dotenv/config";

export const config = {
    url: process.env.URL || "",
    openaiApiKey: process.env.OPENAI_API_KEY || "",
    qdrantUrl: process.env.QDRANT_URL || "",
    qdrantApiKey: process.env.QDRANT_API_KEY || "",
    collectionName: process.env.COLLECTION_NAME || "newDb",
};