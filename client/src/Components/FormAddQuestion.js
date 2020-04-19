import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FormAnswer from './FormAnswer';
import SwalCreate from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import ListAnswer from './ListAnswer';

const FormAddQuestion = ({addQuestionToList, questionEdit, cancelEditOrCreate}) => {
    const Swal = withReactContent(SwalCreate);

    const initialState = {
        _id:'',
        question: '',
        isEditing: false,
        listAnswer: []
    }

    const [questionState, setQuestion] = useState(questionEdit ? questionEdit : initialState);
    const [createAnswer, setCreateAnswer] = useState(false);

    const { question, listAnswer } = questionState;

    const addQuestion = (answer) => {
        if(answer !== ''){
            let object = {
                _id: questionEdit ? questionEdit._id :uuidv4(),
                answer,
                isCorrect: false
            }
            setQuestion({
                ...questionState,
                listAnswer: [...listAnswer, object]
            });
            setCreateAnswer(false);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La respuesta es requerida'
            })
        }
    }

    const cancelAnswer = () => {
        setCreateAnswer(false);
    }

    const selectCorrect = (id) => {
        let newList = listAnswer.filter((answer) => {
            answer.isCorrect = false;
            return answer._id !== id;
        });
        let answerCorrect = listAnswer.filter((answer) => answer._id === id)[0];
        answerCorrect.isCorrect = true;
        setQuestion({
            ...questionState,
            listAnswer: [answerCorrect, ...newList]
        });
    }

    const deleteAnswer = (id) => {
        let newList = listAnswer.filter((answer) => answer._id !== id);
        setQuestion({
            ...questionState,
            listAnswer: newList
        });
    }


    const onHandleChange = (e) => {
        setQuestion({
            ...questionState,
            [e.target.name]: e.target.value
        })
    }

    const onHandleClickAddQuestion = (e) => {
        e.preventDefault();

        let correctAnswer = listAnswer.filter((answer) => answer.isCorrect)[0];

        if(question === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La pregunta es requerida'
            });
            return;
        }else if(listAnswer.length <= 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Agrega respuestas a la pregunta para poder agregarla'
            });
            return;
        }else if(!correctAnswer){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Selecciona alguna respuesta como correcta'
            });
            return;
        }

        //Se manda a la vista padre la pregunta
        addQuestionToList(questionState);
        setQuestion({
            _id:'',
            question: '',
            listAnswer: []
        })
    }

    const onHandleClickCancelQuestion = (e) => {
        e.preventDefault();
        setQuestion(initialState);
        cancelEditOrCreate();
    }

    return ( 
        <div className="card text-center mx-auto mb-3">
            <div className="card-body px-5">
                <h6 className="card-title">Ingresa los datos de la pregunta</h6>
                <div className="form-group text-left">
                    <label htmlFor="question">Pregunta</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="question" 
                        id="question"
                        value={question}
                        onChange={onHandleChange}
                        placeholder="Pregunta"
                    />
                </div>
                <ListAnswer
                    listAnswer={listAnswer}
                    selectCorrect={selectCorrect}
                    deleteAnswer={deleteAnswer}
                />
                
                { createAnswer ? 
                    <FormAnswer
                        addQuestion={addQuestion}
                        cancel={cancelAnswer}
                    /> 
                    :
                    <div className="form-group text-left">
                        <button
                            className="btn btn-Link"
                            onClick={() => (setCreateAnswer(true))}
                        >
                            <i className="fas fa-plus"></i> Agregar respuesta
                        </button> 
                    </div>
                }
                
                <div className="form-group text-left">
                    <div className="row">
                        <div className="col-6">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={onHandleClickAddQuestion}
                            >
                                {question ? <i className="far fa-edit"></i> : <i className="fas fa-plus"></i>}
                                {questionEdit ? ' Editar' : 'Agregar'} pregunta
                            </button> 
                        </div>
                        <div className="col-6">
                            <button
                                className="btn btn-danger btn-block"
                                onClick={onHandleClickCancelQuestion}
                            >
                                <i className="fas fa-times"></i> Cancelar
                            </button> 
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
    );
}
 
export default FormAddQuestion;