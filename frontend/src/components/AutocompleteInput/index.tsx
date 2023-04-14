import type { FunctionComponent, ChangeEvent, CSSProperties } from 'react';
import { Input } from '../Input';
import './autocompleteInput.css';

interface InputProps {
    items: unknown[];
    itemsContainerWidth?: CSSProperties['width'];
    itemsContainerHeight?: CSSProperties['width'];
    inputWidth?: CSSProperties['width'];
    inputHeight?: CSSProperties['height'];
    inputMargin?: CSSProperties['margin'];
    type?: string;
    placeholder: string;
    value: string;
    renderItem: (item: any, index: number) => JSX.Element;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AutocompleteInput: FunctionComponent<InputProps> = ({
    items,
    itemsContainerWidth = '80%',
    itemsContainerHeight = '50%',
    inputWidth = '30%',
    inputHeight = '5%',
    inputMargin = 0,
    type = 'text',
    placeholder,
    value,
    renderItem,
    onChange,
}): JSX.Element => {
    return (
        <>
            <Input 
                width={inputWidth}
                height={inputHeight}
                margin={inputMargin}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
           
            {!!items.length && (
                <div 
                    className='suggestions-container'
                    style={{
                        width: itemsContainerWidth,
                        height: itemsContainerHeight,
                    }}
                >
                    {items.map((item: typeof items[0], index: number): JSX.Element => renderItem(item, index))}
                </div>
            )}
        </>
    );
};