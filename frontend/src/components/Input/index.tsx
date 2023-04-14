import type { FunctionComponent, ChangeEvent, CSSProperties } from 'react';
import './input.css';

interface InputProps {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    margin?: CSSProperties['margin'];
    type?: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FunctionComponent<InputProps> = ({
    width = '30%',
    height = '5%',
    margin = 0,
    type = 'text',
    placeholder,
    value,
    onChange,
}): JSX.Element => {
    return (
        <input 
            className='input' 
            style={{
                width,
                height,
                margin,
            }}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};