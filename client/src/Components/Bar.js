import React from 'react';
import styled from 'styled-components';
import { openSlideMenu } from '../Helpers/ThemeHelpers';

const BarContainer = styled.div`
    padding: 0 10px;
    height: 100vh;
    display: inline-block;
`;

const OpenButton = styled.a`
    font-size: 36px;
    color: #fff;
`;

const Bar = () => {
    return (
        <BarContainer className="bg-primary">
            <OpenButton 
                href="/#"
                onClick={openSlideMenu}
            >
                <i className="fas fa-bars"></i>
            </OpenButton>
        </BarContainer>
)   ;
}
 
export default Bar;