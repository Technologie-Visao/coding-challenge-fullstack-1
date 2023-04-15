import { useEffect } from "react";
import useViewModel from "./TextureSuggestionsSearchModel";


export default function TextureSuggestionsSearchView() {
    const { getTextureSuggestions, textures } = useViewModel();

    useEffect(() => {
        getTextureSuggestions("brick", 3);
    }, []);

    return (
        <h1>
            {textures.map((texture, i) => {
                return (
                    texture.name
                );
            })}
        </h1>
    );
}