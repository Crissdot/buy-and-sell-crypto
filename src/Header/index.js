import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css';

function Header(props) {
    return (
        <header className="header">
            <nav className="header__nav">
                <NavLink className="header-nav__home" to='/'><span>Inicio</span></NavLink>
                <NavLink className="header-nav__favs" to='/favoritos'><span>Favoritos</span></NavLink>
            </nav>
        </header>
    );
}

export { Header };
