import http from 'http';
import { RagQueue } from '../../Rag/Jobs/RagQueue.js';
import { Redis } from 'ioredis';
import { SocketService } from './SocketService.js';

export const initializeSockets = (httpServer: http.Server) => {
    const ragQueue = new RagQueue();

    const subscriber = new Redis({
        host: 'localhost',
        port: 6379
    });

    const socketService = new SocketService(httpServer, ragQueue, subscriber);
    socketService.startSocket();

}