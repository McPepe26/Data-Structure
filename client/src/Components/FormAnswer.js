import React, { useState } from 'react';

const FormAnswer = ({addQuestion, cancel}) => {
    const [ answer, setAnswer] = useState('');

    const onHandleChange = (e) => {
        setAnswer(e.target.value);
    }

    const onHandleClick = (e) => {
        e.preventDefault();
        addQuestion(answer);
    }

    const onHandleClickCancel = (e) => {
        e.preventDefault();
        cancel();
    }

    return (
        <div>
            <div className="form-group text-left">
                <label htmlFor="answer">Respuesta</label>
                <div className="row">
                    <div className="col-10">
                        <textarea 
                            type="text" 
                            className="form-control" 
                            name="answer" 
                            id="answer"
                            value={answer}
                            onChange={onHandleChange}
                            placeholder="Ingresa la respuesta"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="col-2">
                        <button
                            className="btn btn-primary mb-1"
                            onClick={onHandleClick}
                        >
                            Guardar
                        </button> 
                        <button
                            className="btn btn-danger"
                            onClick={onHandleClickCancel}
                        >
                            Cancelar
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default FormAnswer;