import { useState } from "react";
import { Texture } from "../../Domain/Model/Texture";
import { TextureRepositoryImpl } from "../../Data/Repository/TextureRepositoryImpl";
import TextureDataSourceImpl from "../../Data/DataSource/TextureDataSourceImpl";
import { GetTextureSuggestions } from "../../Domain/UseCase/Texture/GetTextureSuggestions";


export default function TextureSuggestionsSearchModel() {
    const [textures, setTextureSuggestions] = useState<Texture[]>([]);
    const [textureNames, setTextureNames] = useState<string[]>([]);

    const UseCase = new GetTextureSuggestions(
        new TextureRepositoryImpl(new TextureDataSourceImpl())
    );

    async function getTextureSuggestions(searchTerm: string, maxItems: number) {
        // searchTerm placeholder to avoid sending empty param
        setTextureSuggestions(await UseCase.invoke(searchTerm=searchTerm? searchTerm : "___", maxItems=maxItems));
    }

    // Get texture names to populate autocomplete on start
    async function getTextureNames(searchTerm: string, maxItems: number) {
        setTextureNames(GetAutoCompleteData(await UseCase.invoke(searchTerm=searchTerm, maxItems=maxItems)));
    }

    function GetAutoCompleteData(allTextures: Texture[]){
        let textureNames: Array<string> = [];
        {allTextures.map((texture) => {
            textureNames.push(texture.name)
        })}
        return textureNames;
    }

    if(textureNames.length == 0){
        getTextureNames("*", 3);
    }

    return {
        getTextureSuggestions,
        textureNames,
        textures,
    };
}