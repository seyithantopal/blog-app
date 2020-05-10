import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <nav className="footer-navbar sticky-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bottom-logo">Bloglada &copy; 2020</div>                        
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Footer;