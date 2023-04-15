import { Texture } from "../../Domain/Model/Texture";
import { TextureRepository } from "../../Domain/Repository/TextureRepository";
import TextureDataSource from "../DataSource/TextureDataSource";


export class TextureRepositoryImpl implements TextureRepository {
    dataSource: TextureDataSource;

    constructor(_datasource: TextureDataSource) {
        this.dataSource = _datasource;
    }

    async getTextureSuggestions(searchTerm: string, maxItems: number): Promise<Texture[]> {
        return this.dataSource.getTextureSuggestions(searchTerm=searchTerm, maxItems=maxItems);
    }
}