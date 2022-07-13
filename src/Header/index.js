import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css';

function Header(props) {
    return (
        <nav className="header">
            <NavLink className="header__home" to={`${props.location.pathname}/`}>Inicio</NavLink>
            <NavLink className="header__favs" to={`${props.location.pathname}/favoritos`}>Favoritos</NavLink>
        </nav>
    );
}

export { Header };
