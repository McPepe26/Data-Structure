import React, { useContext, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../Context/User/UserContext';
import { calcPositionFooter } from '../Helpers/FooterHelpers';

const NavBar = ({mainIsActive, setMainIsActive}) => {

    //User Context 
    const userContext = useContext(UserContext);
    const { isLogged, user, signOut } = userContext;
    const { name } = user;

    

    const changeLinkActive = (isMain) => {
        setMainIsActive(isMain);
        calcPositionFooter();
    }

    const onHandleClickLinkMenu = () => {
        let menu = document.getElementById('userMenu');
        let button = document.getElementById('userButton');
        let container = document.getElementById('userMenuContainer');
        menu.classList.toggle('show');
        container.classList.toggle('show');
        button.blur();
    }

    const onHandleClickSignOut = (e) =>{
        e.preventDefault();
        signOut();
    }

    //CLick on user button
    const onHandleClickShowUser = (e) => {
        e.preventDefault();
        onHandleClickLinkMenu();
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
                                    className={`nav-link ${mainIsActive ? 'active' : ''}`} to={isLogged ? '/groups' : '/'}
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
                            {!isLogged ? 
                                <Fragment>
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
                                </Fragment> 
                                :
                                    <div id="userMenuContainer" className="dropdown">
                                        <a 
                                            className="btn btn-success dropdown-toggle"
                                            href="#!" 
                                            role="button" 
                                            id="userButton" 
                                            onClick={onHandleClickShowUser}
                                        >
                                            <i className="fas fa-user"></i> <span className="h6">{name}</span>
                                        </a>
                                        <div id="userMenu" className="dropdown-menu">
                                            <Link 
                                                className="dropdown-item" to="/groups"
                                                onClick={onHandleClickLinkMenu}
                                            >
                                                <i className="fas fa-users"></i> <span className="h6">Grupos</span>
                                            </Link> 
                                            <Link 
                                                className="dropdown-item" to="/tests"
                                                onClick={onHandleClickLinkMenu}
                                            >
                                                <i className="fas fa-diagnoses"></i> <span className="h6">Exámenes</span>
                                            </Link> 
                                            <div className="dropdown-divider"></div>
                                            <button 
                                                className="dropdown-item text-danger" to="/tests"
                                                onClick={onHandleClickSignOut}
                                            >
                                                <i className="fas fa-sign-out-alt"></i> <span className="h6">Cerrar sesión</span>
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
 
export default NavBar;