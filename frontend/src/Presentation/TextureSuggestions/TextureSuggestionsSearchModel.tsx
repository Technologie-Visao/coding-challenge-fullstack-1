import { useState } from "react";
import { Texture } from "../../Domain/Model/Texture";
import { TextureRepositoryImpl } from "../../Data/Repository/TextureRepositoryImpl";
import TextureDataSourceImpl from "../../Data/DataSource/TextureDataSourceImpl";
import { GetTextureSuggestions } from "../../Domain/UseCase/Texture/GetTextureSuggestions";


export default function TextureSuggestionsSearchModel() {
    const [textures, setTextureSuggestions] = useState<Texture[]>([]);

    const UseCase = new GetTextureSuggestions(
        new TextureRepositoryImpl(new TextureDataSourceImpl())
    );

    async function getTextureSuggestions(searchTerm: string, maxItems: number) {
        if(searchTerm){
            setTextureSuggestions(await UseCase.invoke(searchTerm=searchTerm, maxItems=maxItems));
        }
    }

    return {
        getTextureSuggestions,
        textures,
    };
}