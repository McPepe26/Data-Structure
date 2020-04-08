import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Footer = () => {
    const [property, setProperty] = useState('');
    useEffect(() => {
        let alto = (document.body.clientHeight);
        let altoVentana = window.innerHeight;

        console.log(alto, altoVentana);
        if(altoVentana > alto)
            setProperty("position: absolute; bottom: 0;");
    });

    const Footer = styled.footer`
        ${property}
        display: block;
        width: 100%;
        padding: 30px 50px;
    `;

    return (
        <Footer className="bg-primary text-white">
            &copy; Estructuras de datos Online Derechos reservados 2020
        </Footer>
    );
}
 
export default Footer;