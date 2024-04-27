import React, { useState } from 'react';
import logoApp from './LogoToDoApp.svg';
import "bootstrap-icons/font/bootstrap-icons.css";
import './Header.css';
const Header = ({ sendToUser }) => {
    const [btnClicked, setbtnClicked] = useState(false);

    const isButtonClicked = () => {
        sendToUser(!btnClicked);
        setbtnClicked(!btnClicked);
    }

    return (
        <nav className="navbar mb-3 border border-3 border-secondary">
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-start">
                            <img src={logoApp} style={{ width: '50px', height: 'auto' }} alt='nevem ki se je zgubla'></img>
                        </div>
                        <div className="col d-flex justify-content-end align-items-center">
                            <div>
                                <i className="bi bi-patch-plus-fill custom-right-arrow" style={{ fontSize: 'xx-large', cursor: 'pointer' }} onClick={isButtonClicked}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
