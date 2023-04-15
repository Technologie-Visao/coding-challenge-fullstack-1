import { Texture } from "../../Domain/Model/Texture";
import TextureDataSource from "./TextureDataSource";
import { TextureEntity } from "./TextureEntity";


// Should create env variables for this
const localhost = "http://localhost:9090"
const textureSuggestionsRoute = "/textures/suggestions"

interface TypedResponse<T = any> extends Response {
    json<P = T>(): Promise<P>;
}

function myFetch<T>(...args: any): Promise<TypedResponse<T>> {
    return fetch.apply(window, args);
}

export default class TextureDataSourceImpl implements TextureDataSource {
    async getTextureSuggestions(searchTerm: string, maxItems: number): Promise<Texture[]> {
    let response = await myFetch<TextureEntity[]>(
        `${localhost}${textureSuggestionsRoute}?` +
        new URLSearchParams({
            searchTerm: searchTerm,
            itemsLimit: maxItems.toString(),
        }));
    let data = await response.json();
    return data.map((item) => ({
        name: item.name,
        description: item.description,
        thumbnail_url: item.thumbnail_url,
    }));
  }
}