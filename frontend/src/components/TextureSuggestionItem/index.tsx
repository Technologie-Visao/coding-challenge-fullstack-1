import type { FunctionComponent } from 'react';
import './textureSuggestionItem.css';

interface TextureSuggestionItemProps {
    name: string;
    description: string;
    imageSource: string;
    onClick: () => void;
}

export const TextureSuggestionItem: FunctionComponent<TextureSuggestionItemProps> = ({
    name,
    description,
    imageSource,
    onClick,
}): JSX.Element => {
    return (
        <div 
            className='suggestion-box'
            onClick={onClick}
        >
            <img className='suggestion-image' src={imageSource}/>
            
            <div className='suggestion-text-box'>
                <p className='suggestion-text suggestion-text-name'>{name}</p>
                <p className='suggestion-text suggestion-text-description'>{description}</p>
            </div>
        </div>
    );
};