import React from 'react';
import styled from 'styled-components';
import SubItemMenu from './SubItemMenu';

const SubListMenu = styled.div`
    background-color: #333;
    overflow: hidden;
    transition: max-height 0.3s;
    max-height: 0;
`;

const ItemContainer = styled.li`
    border-top: 1px solid #2980b9;
    overflow: hidden;
    &:target ${SubListMenu}{
        max-height: 10em;
    }
`;

const ItemHeader = styled.a`
    display: block;
    padding: 16px 20px;
    background-color: #3498db;
    color: white;
    position: relative;
    &:hover{
        color: white;
    }
    &::before{
        content: "";
        position: absolute;
        width: 14px;
        height: 14px;
        background-color: #3498db;
        left: 20px;
        bottom: -7px;
        transform: rotate(45deg)
    }
`;

const ItemMenu = ({id, theme}) => {

    const { _id, themeName, themeList } = theme;

    return (
        <ItemContainer id={`List${_id}`}>
            <ItemHeader 
                href={`#List${_id}`}
            >{themeName}</ItemHeader>
            <SubListMenu>
                {themeList.map((subTheme) => (
                    <SubItemMenu
                        subTheme={subTheme}
                        key={subTheme._id}
                    />
                ))}
            </SubListMenu>
        </ItemContainer>
    );
}
 
export default ItemMenu;