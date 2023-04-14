import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

export const Header: FunctionComponent = () => {
    return (
        <header className='header'>
            <a href='#' className='logo'>Visao</a>

            <nav className='navbar'>
                <NavLink to='/textures'>Textures</NavLink>
                <NavLink to='/models'>Models</NavLink>
                <NavLink to='/materials'>Materials</NavLink>
            </nav>
        </header>
    );
};