import React, { Component } from 'react';
import LinkWrapper from '../../Utils/LinkWrapper';


const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper purple darken-3">
                <LinkWrapper  to="/" className="brand-logo" activeStyle= {{}}>Nosso Código</LinkWrapper>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><LinkWrapper to="/autores">Autores</LinkWrapper></li>
                    <li><LinkWrapper to="/livros">Livros</LinkWrapper></li>
                    <li><LinkWrapper to="/sobre">Sobre</LinkWrapper></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;
