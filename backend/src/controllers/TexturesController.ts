import { Request, Response } from 'express';
import { Controller, Get, Use } from '../decorators';
import { requireAuthentication } from '../middlewares';
import textures from '../assets/data.json';

interface Texture {
    name: string;
    description: string;
    thumbnail_url: string;
    weight?: number;
}

@Controller('/textures')
export class TexturesController {
    @Get('')
    @Use(requireAuthentication)
    public getAll(req: Request, res: Response): void {
        res.status(200).send(textures);
    }

    @Get('/suggestions')
    public getSuggestions(req: Request, res: Response): void {
        const term = req.query.term as string || undefined;
        const limit = parseInt(req.query.limit as string) || undefined;

        // Filters textures based on provided term
        const filteredTextures = !!term 
            ? textures.filter((texture: Texture): boolean => texture.name.includes(term) || texture.description.includes(term))
            : textures;

        // Weights textures based on provided term
        const weightedTextures = filteredTextures.map((texture: Texture): Texture => {
            let weight = 0;
            if (!!term && texture.name.includes(term)) weight += 2;
            if (!!term && texture.description.includes(term)) weight += 1;

            return {
                ...texture,
                weight,
            };
        });

        // Slices textures based on provided limit
        const slicedTextures = !!limit  
            ? weightedTextures.slice(0, limit)
            : weightedTextures;

        // Sorts textures in descending order based on weight
        const sortedTextures = slicedTextures.sort((textureA: Texture, textureB: Texture): number => (textureB.weight as number) - (textureA.weight as number));

        res.status(200).send(sortedTextures);
    }
}