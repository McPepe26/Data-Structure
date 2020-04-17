import React from 'react';
import styled from 'styled-components';
import ItemMenu from './ItemMenu';
import { closeSlideMenu } from '../Helpers/ThemeHelpers';
const CloseButton = styled.a`
    position: absolute;
    top: 0;
    right: 22px;
    margin-left: 50px;
    font-size: 30px;
`;

const MenuContainer = styled.div`
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: #111;
    opacity: .9;
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.7s;
`;

const MenuList = styled.div`
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    width: 300px;
    border-radius: 8px;
    overflow: hidden;
`;

const Menu = ({data}) => {
    
    

    return (
        <MenuContainer id="idMenu">
            <CloseButton 
                href="#"
                onClick={closeSlideMenu}
            >
                <i className="fas fa-times"></i>
            </CloseButton>
            <MenuList id="MenuList">
                {data.map((theme) => (
                    <ItemMenu
                        key={theme._id}
                        theme={theme}
                    />
                ))}
            </MenuList>
        </MenuContainer>
    );
}
 
export default Menu;