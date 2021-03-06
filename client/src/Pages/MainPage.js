import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useSpring, animated} from 'react-spring'
import Card from '../Components/Card';
import Header from '../Components/Header';
import { calcPositionFooter } from '../Helpers/FooterHelpers';


const MainPage = ({setMainIsActive}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    useEffect(() => {
        calcPositionFooter();
    });

    return (
        <animated.div className="transition-class" style={props}>
            <Header 
                title="¡Bienvenido!" 
                subtitle="Estructuras de datos Online es la página web de apuntes de estructura de datos con animaciones fáciles de comprender"
            />
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