import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { TexturesApi } from '../../api';
import { Texture } from '../../utils';

export const useTexturesPage = () => {
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ textureSuggestions, setTextureSuggestions ] = useState<Texture[]>([]);

    const handleAutoCompleteInputChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const term = (event.target as HTMLInputElement).value;
        setSearchTerm(term);

        if (term.length <= 2) {
            setTextureSuggestions([]);
            return;
        };

        const suggestions = await TexturesApi.getSuggestions(term, 6);
        setTextureSuggestions(suggestions);
    };

    const selectTextureSuggestion = (textureSuggestion: Texture): void => {
        alert(`Selected texture named ${textureSuggestion.name}`);
    }

    return {
        searchTerm,
        textureSuggestions,
        handleAutoCompleteInputChange,
        selectTextureSuggestion,
    };
};