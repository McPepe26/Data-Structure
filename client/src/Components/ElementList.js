import React from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
    max-width: 100%;
`;

const Element = ({content, dataElement}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    const { type, legend1, legend2, buttons } = content;

    return (
        <animated.div className="transition-class" style={props}>
            <CardContainer className="card text-white bg-info mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className={type === 'simple' ? 'col-8' : 'col-5'}>
                            <p className="card-text lead text-white font-weight-normal">{dataElement[legend1]}</p>
                        </div>
                        {type === 'double' ?
                            <div className="col-3">
                                <p className="card-text lead text-white font-weight-normal">{dataElement[legend2]}</p>
                            </div>
                            :
                            null
                        }
                        <div className="col-4">
                            {buttons.map((buttonInfo) => (
                                !buttonInfo.isLink ?
                                    <button 
                                        key={buttonInfo.text}
                                        name={dataElement._id}
                                        type="button" 
                                        onClick={buttonInfo.action}
                                        className={`btn ${buttonInfo.style} mr-1 ${buttons.length > 1 ? '': 'btn-block'}`}
                                    >{buttonInfo.text}</button>
                                    :
                                    <Link 
                                        key={buttonInfo.text}
                                        name={dataElement._id}
                                        to={`/editTest/${dataElement._id}`}
                                        className={`btn ${buttonInfo.style} mr-1 ${buttons.length > 1 ? '': 'btn-block'}`}
                                    >{buttonInfo.text}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContainer>
        </animated.div>
    );
}
 
export default Element;