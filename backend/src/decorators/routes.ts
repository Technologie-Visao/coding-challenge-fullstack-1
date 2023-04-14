import 'reflect-metadata'
import { MetadataKey, Method } from './keys';

const bindRoute = (method: Method) => {
    return (path: string) => {
        return (target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor): void => {
            Reflect.defineMetadata(MetadataKey.Method, method, target, propertyKey);
            Reflect.defineMetadata(MetadataKey.Path, path, target, propertyKey);
        };
    };
};

export const Get = bindRoute(Method.Get);
export const Post = bindRoute(Method.Post);
export const Put = bindRoute(Method.Put);
export const Patch = bindRoute(Method.Patch);
export const Delete = bindRoute(Method.Delete);