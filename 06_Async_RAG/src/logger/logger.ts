import pino from "pino";

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                // translateTime: 'SYS:standard',
                ignore: 'pid,hostname,time',
            },
        },
    },
    production: true,
    test: false,
}


export { envToLogger }