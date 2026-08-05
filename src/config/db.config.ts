import mongoose from "mongoose";
import logger from "./logger.config";
import { serverConfig } from ".";

export const connectDB = async () =>{
    try {
        const dburi=   serverConfig.DB_URL || "";
        await mongoose.connect(dburi);
        logger.info(`Connected to the database`);
        mongoose.connection.on('error', (err) => {
            logger.error(`Database connection error: ${err}`);
        });
        
        mongoose.connection.on('disconnected', () => {
            logger.warn(`Database connection lost. Attempting to reconnect...`);
            connectDB();
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            logger.info('Database connection closed due to application termination');
            process.exit(0);
        });

    } catch (error) {
        logger.error(`Error connecting to the database: ${error}`);
        process.exit(1);
    }
}