import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    display: block;
    width: 100%;
    padding: 20px 60px;
`;

const Footer = ({property}) => {
    return (
        <FooterContainer className={`bg-primary text-white ${property}`}>
            &copy; Estructuras de datos Online Derechos reservados 2020
        </FooterContainer>
    );
}
 
export default Footer;