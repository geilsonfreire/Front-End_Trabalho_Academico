import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' }),
    ],
});

export default (req, res, next) => {
    const { method, url, headers, body } = req;
    logger.info(`Request: ${method} ${url}`, { headers, body });
    next();
};