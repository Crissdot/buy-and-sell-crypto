import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css';

function Header(props) {
    const openFundAccount = () => {
        props.setOpenFundAccount(true);
        props.setOpenModal(true);
    }

    return (
        <header className="header">
            <nav className="header__nav">
                <NavLink className="header-nav__home" to='/'><span>Inicio</span></NavLink>
                <NavLink className="header-nav__favs" to='/favoritos'><span>Favoritos</span></NavLink>
            </nav>
            <button className="header__fund" type="button" onClick={openFundAccount}>
                <span>Fondear Cuenta</span>
                <svg className="w-6 h-6" fill="var(--primary-color)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
            </button>
        </header>
    );
}

export { Header };
