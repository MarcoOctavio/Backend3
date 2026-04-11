import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockingRouter from './routes/mocking.router.js';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
import { addLogger } from './middlewares/logger.middleware.js';
import { logger } from './config/logger.js';
import loggerRouter from './routes/logger.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;
app.use(addLogger);

const startServer = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        logger.info("MongoDB connected");

    } catch (error) {

        logger.error("Database connection failed:", error);

    }
};

startServer();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/logger', loggerRouter);
app.use('/api/mocking',mockingRouter);

app.use(errorHandler);

app.listen(PORT,()=>logger.info(`Listening on ${PORT}`))
