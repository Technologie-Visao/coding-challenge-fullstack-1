import { ChangeEvent } from "react";
import useViewModel from "./TextureSuggestionsSearchModel";
import CustomTextField from "../../Components/TextureSearchBar";
import TextureComponent from "../Texture/TextureView";


export default function TextureSuggestionsSearchView() {
    const { getTextureSuggestions, textures } = useViewModel();

    return (
        <div>
            <h1>Texture suggestions</h1>
            <div style={{width:"100%"}}>
                <CustomTextField changeHandler={function (event: ChangeEvent<HTMLInputElement>): void {
                    getTextureSuggestions(event.currentTarget.value, 10);
                }}/>
            </div>
            {textures.map((texture, i) => {
                return (
                    <TextureComponent key={i} name={texture.name} description={texture.description} thumbnail_url={texture.thumbnail_url}/>
                );
            })}
        </div>
        
    );
}