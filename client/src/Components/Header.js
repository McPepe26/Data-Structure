import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: block;
    padding: 60px 20px;
    width: 100%;
    text-align: center;
`;

const Header = ({title, subtitle}) => {
    return (
        <HeaderContainer className="bg-primary text-white">
            <h1>{title}</h1>
            <p className="lead text-white pt-3">
                {subtitle}
            </p>
        </HeaderContainer>
    );
}
 
export default Header;
