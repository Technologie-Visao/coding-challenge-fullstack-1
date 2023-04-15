import { Texture } from "../../Model/Texture";
import { TextureRepository } from "../../Repository/TextureRepository";


export interface GetTextureSuggestionsUseCase {
    invoke: (searchTerm: string, maxItems: number) => Promise<Texture[]>
}

export class GetTextureSuggestions implements GetTextureSuggestionsUseCase {
    private textureRepo: TextureRepository
    constructor(_textureRepo: TextureRepository) {
        this.textureRepo = _textureRepo;
    }

    async invoke(searchTerm: string, maxItems: number) {
        return this.textureRepo.getTextureSuggestions(searchTerm=searchTerm, maxItems=maxItems)
    }
}