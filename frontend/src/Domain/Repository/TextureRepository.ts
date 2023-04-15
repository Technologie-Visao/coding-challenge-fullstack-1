import { Texture } from "../Model/Texture";


export interface TextureRepository {
    getTextureSuggestions(searchTerm: string, maxItems: number): Promise<Texture[]>;
}