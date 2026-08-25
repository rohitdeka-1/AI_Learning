import { buildApp } from "./app.js"

const start = async () => {
    const app = await buildApp();
    try {
        app.listen(({ port: 3000 }), async () => {
            app.log.info(`server started`)
        })
    } catch (err) {
        app.log.error(err);
    }
}

start();