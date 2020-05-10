import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    return (
        <div>
            <header>
                <nav className="header-navbar">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="nav-title">
                                    <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                                        Bloglada
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>    
                </nav>            
            </header>
        </div>
    );
}

export default Nav;