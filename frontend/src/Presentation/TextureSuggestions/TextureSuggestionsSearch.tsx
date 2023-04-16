import useViewModel from "./TextureSuggestionsSearchModel";
import TextureComponent from "../Texture/TextureView";
import AutoComplete from "../../Components/AutoComplete";


export default function TextureSuggestionsSearchView() {
    const { getTextureSuggestions, textureNames, textures } = useViewModel();
    return (
        <div>
            <h1 style={{textTransform:"uppercase"}}>Textures</h1>
            <div style={{width:"100%"}}>{
                <AutoComplete   data={textureNames} 
                                inputChangeHandler={function (input: string): void {
                                    getTextureSuggestions(input, 10);
                                } } 
                                minSearchInput={2}
                                maxElementsDisplayed={5}
                />}
            </div>
            {textures.map((texture, i) => {
                return (
                    <TextureComponent key={i} name={texture.name} description={texture.description} thumbnail_url={texture.thumbnail_url}/>
                );
            })}
        </div>
        
    );
}