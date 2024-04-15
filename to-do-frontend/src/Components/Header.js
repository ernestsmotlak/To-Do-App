import React from 'react';
import logoApp from './LogoToDoApp.svg';
const Header = () => {
    return (
        <nav className="navbar bg-dark-subtle mb-3 border border-3 border-secondary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img className='' src={logoApp} style={{ width: '50px', height: 'auto' }} alt='nevem ki se je zgubla'></img>

                </a>
            </div>
        </nav>
    );
};

export default Header;
