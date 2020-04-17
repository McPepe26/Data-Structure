import React, { useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../Context/Theme/ThemeContext';
import { closeSlideMenu } from '../Helpers/ThemeHelpers';

const SubItem = styled.a`
    display: block;
    padding: 16px 26px;
    color: white;
    font-size:14px;
    margin: 4px 0;
    position: relative;
    text-decoration: none;
    
    &::before{
        content: "";
        position: absolute;
        width: 6px;
        height: 100%;
        background-color: #3498db;
        left: 0;
        top: 0;
        transition: 0.3s;
        opacity: 0;
    }
    &:hover{
        color: white;
    }
    &:hover:before{
        opacity: 1;
    }
`;

const SubItemMenu = ({subTheme}) => {
    const { _id, subthemeName} = subTheme;

    //Theme context
    const themeContext = useContext(ThemeContext);
    const { selectTheme, setLoading } = themeContext;

    const onHandleClicSubTheme = (e) =>{
        e.preventDefault();
        setLoading(true)
        selectTheme(e.target.name);
        closeSlideMenu();
    }

    return (
        <SubItem
            href="#!"
            name={_id}
            onClick={onHandleClicSubTheme}
        >
            {subthemeName}
        </SubItem>
    );
}
 
export default SubItemMenu;