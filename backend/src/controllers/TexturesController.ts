import { Request, Response } from 'express';
import { Controller, Get, Use } from '../decorators';
import { requireAuthentication } from '../middlewares';
import textures from '../assets/data.json';

@Controller('/textures')
export class TexturesController {
    @Get('')
    @Use(requireAuthentication)
    public getAll(req: Request, res: Response): void {
        res.status(200).send(textures);
    }

    @Get('/search/:input')
    public getSearch(req: Request, res: Response): void {
        const filteredTextures = textures.filter((texture: any): boolean => texture.name.includes(req.params.input));
        res.status(200).send(filteredTextures);
    }
}