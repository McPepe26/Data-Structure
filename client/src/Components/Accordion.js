import React, { useState } from 'react';

const Accordion = ({data, deleteQuestion, editQuestion}) => {

    const onHandleCollapse = (e) =>{
        e.preventDefault();
    }

    const onHandleDelete = (e) => {
        e.preventDefault();
        deleteQuestion(e.target.name)
    }

    const onHandleEdit = (e) => {
        e.preventDefault();
        editQuestion(e.target.name);
    }

    return (
        <div id="accordion" className="mb-2">
            {data.length > 0 ?
                data.map((question) => (
                    <div 
                        className="card"
                        key={question._id}
                    >
                        <div className="card-header" id={`heading${question._id}`}>
                            <h5 className="mb-0">
                                <button onClick={onHandleCollapse} className="btn collapsed" data-toggle="collapse" data-target={`#collapse${question._id}`} aria-expanded="false" aria-controls={`collapse${question._id}`}>
                                    { question.question }
                                </button>
                            </h5>
                        </div>
                        <div id={`collapse${question._id}`} className="collapse" aria-labelledby={`heading${question._id}`} data-parent="#accordion">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8">
                                        <ul className="list-group">
                                            {question.answerList.map((answer) => (
                                                <li 
                                                    className="list-group-item"
                                                    key={answer._id}
                                                >{answer.answer}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-4">
                                        <button 
                                            type="button" 
                                            name={question._id}
                                            onClick={onHandleEdit}
                                            className="btn btn-secondary btn-block"
                                        >
                                            <i className="fas fa-edit"></i>Editar
                                        </button>
                                        <button 
                                            type="button" 
                                            name={question._id}
                                            onClick={onHandleDelete}
                                            className="btn btn-danger btn-block"
                                        >
                                            <i className="fas fa-trash-alt"></i>Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                :
                <p className="mt-2 lead text-center"> No hay preguntas que mostrar que mostrar. ¡Agrega una!</p>
            }
        </div>
    );
}
 
export default Accordion;