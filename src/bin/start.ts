import http from "http"
import mongoose from "mongoose";
import config from "../config/config.js"
import createApp from "../app.js" 
import { Application } from 'express';
const { logger } = config;
const app:Application = createApp(config);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

mongoose
    .connect(config.database.dsn)
    .then(() => {
        config.database.status.connected = true;
        logger.info('Connected to MongoDB');
        server.listen(port);
    })
    .catch((error) => {
        config.database.status.error = error;
        logger.error(error);
        server.listen(port);
    });

server.on('error', (error:NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
});

server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`);
});