import React from 'react';
import logoApp from './LogoToDoApp.svg';
const Header = () => {
    return (
        <nav className="navbar bg-dark-subtle mb-3 border border-3 border-secondary">
            <div className="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col d-flex justify-content-start">
                            <img className='' src={logoApp} style={{ width: '50px', height: 'auto' }} alt='nevem ki se je zgubla'></img>
                        </div>
                        <div class="col d-flex justify-content-end align-items-center">
                            <div className=''></div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
