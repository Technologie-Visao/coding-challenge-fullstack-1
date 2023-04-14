import { Request, Response, NextFunction } from 'express';

interface Target {
    [key: string]: Function;
}

export const Async  = (target: Target, propertyKey: string, propertyDescriptor: PropertyDescriptor): void => {
    let handler = target[propertyKey];

    handler = async function(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    }
}