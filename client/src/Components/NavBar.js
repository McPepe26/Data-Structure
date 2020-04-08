import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [mainIsActive, setMainIsActive] = useState(true);

    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <Link className="navbar-brand" to="#">Estructuras de datos Online</Link>
            
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${mainIsActive ? 'active' : ''}`} to="/"
                            onClick={() =>{setMainIsActive(true)}}
                        >Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${mainIsActive ? '' : 'active'}`} to="/themes"
                            onClick={() =>{setMainIsActive(false)}}
                        >Temas</Link>
                    </li>
                </ul>
                <div className="d-inline my-2 my-lg-0">
                    <Link className="d-inline btn btn-success" to="/signin">
                        <i className="fas fa-sign-in-alt"></i> <span>Iniciar Sesión</span>
                    </Link>
                    <Link className="d-inline btn btn-success ml-1" to="/signup">
                        <i className="fas fa-user-plus"></i> Registrarse
                    </Link>
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;