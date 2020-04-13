import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({setProperty, mainIsActive, setMainIsActive}) => {
    
    const changeLinkActive = (isMain) => {
        setMainIsActive(isMain);
        setProperty('');
    }

    return (
        <div className="bg-primary">
            <div className="container">
                <nav className="navbar navbar-expand navbar-dark bg-primary">
                    <Link 
                        className="navbar-brand" to="/"
                        onClick={() =>{changeLinkActive(true)}}
                    >Estructuras de datos Online</Link>
                    
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${mainIsActive ? 'active' : ''}`} to="/"
                                    onClick={() =>{changeLinkActive(true)}}
                                ><span className="h6">Inicio</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${mainIsActive ? '' : 'active'}`} to="/themes"
                                    onClick={() =>{changeLinkActive(false)}}
                                ><span className="h6">Temas</span></Link>
                            </li>
                        </ul>
                        <div className="d-inline my-2 my-lg-0 mr-3">
                            <Link 
                                className="d-inline btn btn-success" to="/signin"
                                onClick={() =>{changeLinkActive(true)}}
                            >
                                <i className="fas fa-sign-in-alt"></i> <span className="h6">Iniciar Sesión</span>
                            </Link>
                            <Link 
                                className="d-inline btn btn-success ml-2" to="/signup"
                                onClick={() =>{changeLinkActive(true)}}
                            >
                                <i className="fas fa-user-plus"></i> <span className="h6">Registrarse</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
 
export default NavBar;