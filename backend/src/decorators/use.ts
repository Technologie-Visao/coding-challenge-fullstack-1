import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKey } from './keys';

export const Use = (...middlewares: RequestHandler[]) => {
    return (target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor): void => {
        const currentMiddlewares = Reflect.getMetadata(MetadataKey.Middleware, target, propertyKey) || [];

        for (let middleware of middlewares) {
            currentMiddlewares.push(middleware);
        }

        Reflect.defineMetadata(MetadataKey.Middleware, currentMiddlewares, target, propertyKey);
    };
};