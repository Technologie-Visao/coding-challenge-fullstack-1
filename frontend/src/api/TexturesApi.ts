import { http } from './http';
import type { HttpResponse } from './http';
import { Texture } from '../utils';

export class TexturesApi {
    public static async getSuggestions(term: string, limit: number): Promise<Texture[]> {
        const config = {
            params: {
                term, 
                limit,
            },
        };
        
        const { data }: HttpResponse = await http.get<Texture[]>(`/textures/suggestions`, config);

        return data;
    }
}