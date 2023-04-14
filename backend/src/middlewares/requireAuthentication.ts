import { Request, Response, NextFunction } from 'express';

export const requireAuthentication = (req: Request, res: Response, next: NextFunction): void => {
    console.log('Validating JWT for authentication');

    next();
}