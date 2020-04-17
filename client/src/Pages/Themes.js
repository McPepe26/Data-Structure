import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring';
import Theme from '../Components/Theme';
import Bar from '../Components/Bar';
import Menu from '../Components/Menu';
import Loader from '../Components/Loader'
import ThemeContext from '../Context/Theme/ThemeContext';
import { calcPositionFooter } from '../Helpers/FooterHelpers';

    const Content = styled.div`
        overflow: hidden;
    `;    

    const Icon = styled.div`
        width: 345px;
        margin-right:auto;
        margin-left:auto;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
    `;

const Themes = ({setMainIsActive}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    //Theme context
    const themeContext = useContext(ThemeContext);
    const { themes, themeSelected, loadTheme } = themeContext;

    useEffect(() => {
        setMainIsActive(false);
        calcPositionFooter();
    });
    
    const isThemeSelected = () => {
        if(loadTheme){
            return(
                <Loader
                    name="tema"
                />
            );
        }

        if(themeSelected){
            return(
                <Theme
                    theme={themeSelected}
                />
            );
        }

        return(
            <div className="col-4 mx-auto text-center pt-3">
                <Icon className="text-size-big bg-primary text-white"><i className="fas fa-file-alt"></i></Icon>
                <h3 className="">Despliega el menú lateral para ver los temas disponibles</h3>
            </div>
        );
    }
    
    return (
        <animated.div className="transition-class" style={props}>
            <Content>
                <div className="row">
                    {isThemeSelected()}
                    <div className="sticky">
                        <Bar/>
                        <Menu
                            data={themes}
                        />
                    </div>
                </div>
            </Content>
        </animated.div>
    );
}
 
export default Themes;