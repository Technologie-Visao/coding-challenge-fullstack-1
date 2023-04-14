import type { FunctionComponent } from 'react';
import { AutocompleteInput, TextureSuggestionItem } from '../../components';
import { Texture } from '../../utils';
import { useTexturesPage } from './useTexturesPage';
import './texturesPage.css';

export const TexturesPage: FunctionComponent = (): JSX.Element => {
    const {
        searchTerm,
        textureSuggestions,
        handleAutoCompleteInputChange,
        selectTextureSuggestion,
    } = useTexturesPage();

    return (
        <>
            <AutocompleteInput 
                items={textureSuggestions}
                placeholder='Search suggestions'
                value={searchTerm}
                inputMargin='3% 0 0 0'
                onChange={handleAutoCompleteInputChange}
                renderItem={(item: Texture, index: number): JSX.Element => {
                    return (
                        <TextureSuggestionItem
                            key={index}
                            name={item.name}
                            description={item.description}
                            imageSource={item.thumbnail_url}
                            onClick={(): void => {
                                selectTextureSuggestion(item)
                            }}
                        />
                    );
                }}
            />
        </>
    );
};