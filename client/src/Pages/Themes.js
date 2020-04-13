import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring'
import Theme from './Theme';

    const Content = styled.div`
        overflow: hidden;
    `;

    const Bar = styled.div`
        padding: 0 10px;
        height: 100vh;
        display: inline-block;
    `;

    const OpenButton = styled.a`
        font-size: 36px;
        color: #fff;
    `;

    const CloseButton = styled.a`
        position: absolute;
        top: 0;
        right: 22px;
        margin-left: 50px;
        font-size: 30px;
    `;

    const Menu = styled.div`
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

    const SubMenu = styled.div`
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
        width: 300px;
        border-radius: 8px;
        overflow: hidden;
    `;

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
    
    const ItemMenu = styled.a`
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

    const Icon = styled.div`
        width: 345px;
        margin-right:auto;
        margin-left:auto;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
    `;

const Themes = ({theme, setProperty, setMainIsActive}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    useEffect(() => {
        setMainIsActive(false);
        let height = (document.body.clientHeight);
		let heightWindow = window.innerHeight;
		console.log(height, heightWindow, (heightWindow > height));
        if(heightWindow > height)
			setProperty("sticky-footer");
	});

    const openSlideMenu = (e) => {
        e.preventDefault();

        let menu = document.getElementById('idMenu');
        let submenu = document.getElementById('submenu');
        menu.style.width = `${submenu.clientWidth+30}px`;
        menu.style.paddingLeft = `10px`;
        menu.style.paddingRight = `10px`;
        menu.style.paddingBottom = `50px`;

    }

    const closeSlideMenu = (e) => {
        e.preventDefault();
        let menu = document.getElementById('idMenu');
        menu.style.width = `0`;
        menu.style.paddingLeft = `0`;
        menu.style.paddingRight = `0`;
    }
    
    return (
        <animated.div className="transition-class" style={props}>
            <Content>
                <div className="row">
                    {theme ? 
                        <Theme/>
                    :
                        <div className="col-4 mx-auto text-center pt-3">
                            <Icon className="text-size-big bg-primary text-white"><i className="fas fa-file-alt"></i></Icon>
                            <h3 className="">Despliega el menú lateral para ver los temas disponibles</h3>
                        </div>
                    }
                    <div className="ml-1 sticky">
                        <Bar className="bg-primary">
                            <OpenButton 
                                href="/#"
                                onClick={openSlideMenu}
                            >
                                <i className="fas fa-bars"></i>
                            </OpenButton>
                        </Bar>
                            
                        <Menu id="idMenu">
                            <CloseButton 
                                href="#"
                                onClick={closeSlideMenu}
                            >
                                <i className="fas fa-times"></i>
                            </CloseButton>
                            <SubMenu id="submenu">
                                <ItemContainer id="List1">
                                    <ItemMenu 
                                        href="#List1"
                                    >Item 1</ItemMenu>
                                    <SubListMenu>
                                        <SubItem
                                            href="/theme/1"
                                        >
                                            Sub Item 1
                                        </SubItem>
                                        <SubItem
                                            href="/theme/2"
                                        >
                                            Sub Item 2
                                        </SubItem>
                                    </SubListMenu>
                                </ItemContainer>
                                <ItemContainer id="List2">
                                    <ItemMenu
                                        href="#List2"
                                    >Item 2</ItemMenu>
                                    <SubListMenu>
                                        <SubItem
                                            href="/theme/3"
                                        >
                                            Sub Item 1
                                        </SubItem>
                                        <SubItem
                                            href="/theme/4"
                                        >
                                            Sub Item 2
                                        </SubItem>
                                    </SubListMenu>
                                </ItemContainer>
                            </SubMenu>
                        </Menu>
                    </div>
                </div>
            </Content>
        </animated.div>
    );
}
 
export default Themes;