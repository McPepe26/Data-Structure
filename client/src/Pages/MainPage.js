import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {useSpring, animated} from 'react-spring'
import Card from '../Components/Card';

const Header = styled.div`
    display: block;
    padding: 100px 20px;
    width: 100%;
    text-align: center;
`;


const MainPage = ({setMainIsActive}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}})

    return (
        <animated.div className="transition-class" style={props}>
            <Header className="bg-primary text-white">
                <h1>¡Bienvenido!</h1>
                <p className="lead text-white pt-3">
                    Estructuras de datos Online es la página web de apuntes de estructura de datos con animaciones fáciles de comprender
                </p>
            </Header>

            <div className="container pt-5 mb-3">
                <div className="row">
                    <div className="col-4">
                        <Link 
                            className="btn btn-primary btn-block" to="/themes"
                            onClick={() =>{setMainIsActive(false)}}
                        >
                            <span className="h5">¡Comienza a estudiar!</span>
                        </Link>
                    </div>
                    <div className="col-4">
                        <Link 
                            className="btn btn-primary btn-block" to="/signin"
                            onClick={() =>{setMainIsActive(false)}}
                        >
                            <span className="h5">Iniciar Sesión</span>
                        </Link>
                    </div>
                    <div className="col-4">
                        <Link 
                            className="btn btn-primary btn-block" to="/signup"
                            onClick={() =>{setMainIsActive(false)}}
                        >
                            <span className="h5">Registrarse</span>
                        </Link>
                    </div>
                    <div className="col-6 p-5">
                        <Card
                            title="Para estudiantes"
                            content="Estructuras de datos Online contiene una gran variedad de apuntes sobre estructuras de datos así como un simulador interactivo de aquellas estructuras para una mejor comprensión."
                        />
                    </div>
                    <div className="col-6 p-5">
                        <Card
                            title="Para profesores"
                            content="Estructuras de datos Online ayuda a los docentes a aplicar evaluaciones en línea de una forma sencilla, segura y rápida, así mismo proporciona vistas estadísticas para poder analizar los resultados de las evaluaciones aplicadas."
                        />
                    </div>
                </div>
            </div>
            </animated.div>
    );
}
 
export default MainPage;