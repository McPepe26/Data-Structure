import React, { Fragment, useState } from 'react';
import Element from './ElementList';
import styled from 'styled-components';

const CardContainer = styled.div`
    max-width: 100%;
`;

const List = ({content}) => {
    const { title, inputData, data } = content;

    //Search state
    const [search, setSearch] = useState('');

    const onHandleChangeSearchInput = (e) => {
        setSearch(e.target.value);
        inputData.onChange(e.target.value);
    }

    const onHandleClickCancelSearch = () => {
        setSearch('');
        inputData.onChange('');
    }

    return ( 
        <Fragment>
            <CardContainer className="card text-white bg-warning mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className={`col-${search.length > 0 ? '6': '7'}`}>
                            <h4 className="card-title">{title}</h4>
                        </div>
                        <div className="col-4">
                            {inputData ? 
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="search" 
                                    placeholder={inputData.textInput}
                                    value={search}
                                    onChange={onHandleChangeSearchInput}
                                />
                                : null
                            }
                        </div>
                        {search.length > 0 ? 
                            <div className="col-1 ml-0 pl-0">
                                <button 
                                    className="btn btn-danger"
                                    onClick={onHandleClickCancelSearch}
                                >
                                    <span className="h5"><i class="far fa-times-circle"></i></span>
                                </button>
                            </div>
                            : null
                        }
                        <div 
                            className="col-10 mx-auto mt-2"
                        >
                            {data.length > 0 ? 
                                data.map((element) => (
                                    <Element
                                        key={element._id}
                                        content = {content}
                                        dataElement = {element}
                                    />
                                ))
                                :
                                <p className="display-4 mt-2 lead text-white text-center"> No hay grupos que mostrar </p>
                            }
                        </div>
                        
                    </div>
                </div>
            </CardContainer>
        </Fragment>
    );
}
 
export default List;