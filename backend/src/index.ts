import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { CustomError } from './utils/customError';
import { searchTermRouter } from './routes/searchTerm.router';

// Load environment variables from the .env file
dotenv.config();

// Define the default port number
const PORT = process.env.PORT || 3000;

// Create a new Express app instance
const app: Express = express();

// Use Helmet to secure the app with various HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request bodies in a middleware before the handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the search term router for all routes
app.use('/', searchTermRouter);

/**
 * Error handling middleware.
 * @param {CustomError} err - The error instance.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // Check if the error is an instance of CustomError and handle it accordingly
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  // Return a generic error message for unknown errors
  res.status(500).json({ message: 'An unknown error occurred' });
});

// Start the Express server
const server = app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

// Handle the 'error' event emitted by the server
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `Port ${PORT} is already in use. Please free the port or use a different one.`
    );
  } else {
    console.error('An error occurred while starting the server:', error);
  }
});
