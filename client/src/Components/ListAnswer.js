import React from 'react';

const ListAnswer = ({listAnswer, selectCorrect, deleteAnswer}) => {

    const onHandleClick = (e) => {
        e.preventDefault();
        selectCorrect(e.target.name);
    }

    const onHandleCancel = (e) => {
        e.preventDefault();
        deleteAnswer(e.target.name);
    }
    return (
        <ul className="list-group">
            { listAnswer.length > 0 ? 
                listAnswer.map((answer) => (
                    <li 
                        className="list-group-item"
                        key={answer._id}
                    >
                        <div className="row">
                            <div className={`col-6 text-left`}>{answer.answer}</div>
                            {answer.isCorrect ? 
                                <div className="col-4"><span className="badge badge-primary badge-pill">Respuesta correcta</span></div>
                                :
                                <div className="col-4"> 
                                    <button
                                        className="btn"
                                        name={answer._id}
                                        onClick={onHandleClick}
                                    >
                                        <i className="far fa-hand-pointer"></i> Seleccionar como correcta
                                    </button>
                                </div>
                            }
                            <div className="col-2"> 
                                <button
                                    className="btn btn-danger"
                                    name={answer._id}
                                    onClick={onHandleCancel}
                                >
                                    Eliminar
                                </button> 
                            </div>
                        </div>
                    </li>
                ))
                :
                null
            }
        </ul>
    );
}
 
export default ListAnswer;