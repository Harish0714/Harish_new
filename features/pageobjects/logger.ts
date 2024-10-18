import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: 'info', // Adjust logging level as needed (e.g., 'debug', 'warn', 'error')
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' }) // Logs will be stored in 'logs/app.log'
    ]
});