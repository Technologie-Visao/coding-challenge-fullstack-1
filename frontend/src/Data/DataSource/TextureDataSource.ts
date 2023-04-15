import { Texture } from "../../Domain/Model/Texture";

export default interface TextureDataSource {
    getTextureSuggestions(searchTerm: String, maxItems: number): Promise<Texture[]>;
}