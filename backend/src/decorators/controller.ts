import 'reflect-metadata';
import { MetadataKey, Method } from './keys';
import { Server } from '../Server';

export const Controller = (routePrefix: string) => {
    return (constructor: Function): void => {
        const router = Server.getRouter();
        const constructorPrototype = constructor.prototype;

        for (let propertyKey in constructorPrototype) {
            const method: Method = Reflect.getMetadata(MetadataKey.Method, constructorPrototype, propertyKey);

            if (!!method) {
                // NOTE: Binding Constructor Prototype to Router Handler to be able to use the this keyword inside a Controller Class
                const routeHandler = constructorPrototype[propertyKey].bind(constructorPrototype);

                const path = Reflect.getMetadata(MetadataKey.Path, constructorPrototype, propertyKey);
                const middlewares = Reflect.getMetadata(MetadataKey.Middleware, constructorPrototype, propertyKey) || [];

                router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
            }
        }
    };
};