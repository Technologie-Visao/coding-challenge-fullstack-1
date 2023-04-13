import express, { Request, Response } from 'express';
import { ValidationChain, check, validationResult } from 'express-validator';
import { ISearchTermService } from '../services/searchTerm.service';
import { container } from '../container';
import { CustomError } from '../utils/customError';

// Constants
const SEARCH_TERM_MIN_LENGTH = 2;
const LIMIT_MIN = 1;
const LIMIT_MAX = 5;

// Get the search term service from the dependency injection container
const searchTermService =
  container.get<ISearchTermService>('SearchTermService');

// Create a new Express router instance for search term routes
export const searchTermRouter = express.Router();

/**
 * Middleware for validating query parameters.
 * @type {Array}
 */
const validateQueryParameters: Array<ValidationChain> = [
  check('searchTerm')
    .exists()
    .withMessage('searchTerm is missing')
    .isLength({ min: SEARCH_TERM_MIN_LENGTH })
    .withMessage('searchTerm must be at least 2 characters long'),
  check('limit')
    .exists()
    .withMessage('limit is missing')
    .isInt({ min: LIMIT_MIN, max: LIMIT_MAX })
    .withMessage('Limit must be between 1 and 5'),
];

/**
 * Route handler for getting texture suggestions.
 */
searchTermRouter.get(
  '/textures/suggestions',
  validateQueryParameters,
  async (req: Request, res: Response, next: express.NextFunction) => {
    // Validate the request query parameters
    const errors = validationResult(req);

    // If there are validation errors, return a 400 Bad Request error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Extract search term and limit from the request query parameters
      const searchTerm = {
        searchTerm: req.query.searchTerm as string,
        limit: parseInt(req.query.limit as string),
      };

      // Retrieve texture suggestions from the search term service
      const results = await searchTermService.findSearchItem(searchTerm);

      // If there are no results, return a 404 Not Found error
      if (results.length === 0) {
        return res.status(404).json({ message: 'No suggestions found' });
      }

      // Send the results in the response
      res.status(200).send(results);
    } catch (err: unknown) {
      // Handle errors using custom error handling
      if (err instanceof CustomError) {
        next(err);
      } else if (err instanceof Error) {
        next(new CustomError(err.message, 500));
      } else {
        next(new CustomError('An unknown error occurred', 500));
      }
    }
  }
);
