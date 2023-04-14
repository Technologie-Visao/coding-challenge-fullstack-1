import { Request, Response, NextFunction, } from 'express';

export const error = (error: unknown, req: Request, res: Response, next: NextFunction): void => {
    res.status(500).send(`Error: ${error}`);
};