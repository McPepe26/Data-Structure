import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    max-width: 100%;
`;

const Card = ({title, content}) => {
    return (
        <CardContainer className="card text-white bg-secondary mb-3">
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <p className="card-text lead text-white font-weight-normal">{content}</p>
            </div>
        </CardContainer>
    );
}
 
export default Card;