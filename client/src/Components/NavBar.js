import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({mainIsActive, setMainIsActive}) => {
    

    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <Link className="navbar-brand" to="#">Estructuras de datos Online</Link>
            
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${mainIsActive ? 'active' : ''}`} to="/"
                            onClick={() =>{setMainIsActive(true)}}
                        ><span className="h6">Inicio</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${mainIsActive ? '' : 'active'}`} to="/themes"
                            onClick={() =>{setMainIsActive(false)}}
                        ><span className="h6">Temas</span></Link>
                    </li>
                </ul>
                <div className="d-inline my-2 my-lg-0 mr-3">
                    <Link className="d-inline btn btn-success" to="/signin">
                        <i className="fas fa-sign-in-alt"></i> <span className="h6">Iniciar Sesión</span>
                    </Link>
                    <Link className="d-inline btn btn-success ml-2" to="/signup">
                        <i className="fas fa-user-plus"></i> <span className="h6">Registrarse</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;