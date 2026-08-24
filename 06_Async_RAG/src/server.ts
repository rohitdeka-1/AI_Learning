import { buildApp } from "./index.js";


const start = async (): Promise<void> => {
    const app = await buildApp();

    try {
        app.listen({ port: 3000 }, () => {
            app.log.info("Server is running on port 3000")
        })
    } catch (err) {
        app.log.error("Error: " + err)
    }
}

start();


