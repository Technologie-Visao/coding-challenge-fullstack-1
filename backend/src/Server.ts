import express, { Express, Router } from 'express';
import { cors, error } from './middlewares';

export class Server {
    private static _app: Express;
    private static _router: Router;

    public static getApp() {
        if (!Server._app) {
            Server._app = express();
            
            Server._app.use(express.urlencoded({ extended: true }));
            Server._app.use(express.json());
            Server._app.use(cors);
            Server._app.use(Server.getRouter());
            Server._app.use(error);
        }

        return Server._app;
    }

    public static getRouter(): Router {
        if (!Server._router) {
            Server._router = Router();
        }

        return Server._router;
    }
}