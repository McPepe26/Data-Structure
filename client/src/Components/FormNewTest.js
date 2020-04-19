import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import SwalCreate from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from './Loader'
import TestContext from '../Context/Test/TestContext';
import GroupContext from '../Context/Group/GroupContext';
import { getFormatDate, getObjectDate } from '../Helpers/TestHelpers';
import { calcPositionFooter } from '../Helpers/FooterHelpers';
import Accordion from './Accordion';
import FormAddQuestion from './FormAddQuestion';
import { useParams } from 'react-router-dom';

const CardContainer = styled.div`
    max-width: 80%;
`;

const FormNewTest = ({history}) => {
    useEffect(() => {
        calcPositionFooter();
    });
    
    useEffect(() => {
        loadGroups();
    }, []);

    const Swal = withReactContent(SwalCreate);
    const { activeTest, setNewTest, setEditTest, saveEditTest } = useContext(TestContext);
    const params = useParams();

    //Group context
    const groupContext = useContext(GroupContext);
    const { userGroups, loadGroups } = groupContext;

    //State of questions
    // const [questions, addQuestions] = useState([]);
    const [create, setCreate] = useState(false);
    const [questionEdit, setQuestionEdit] = useState({});
    const [edit, setEdit] = useState(false);
    //State of test
    const [ test, setTest ] = useState(params.id ? setEditTest(params.id) : activeTest);
    if(!test && params.id) {
        return <p className="display-4 mt-2 lead text-center"> No existe este exámen </p>
    }
    const { groupId, nameTest, dateIn, dateOut, hourIn, hourOut, time, questionList} = test;

    const onHandleClickSaveTest = (e) => {
        e.preventDefault();
        let legend, error;
        if(nameTest === ''){
            legend = 'El nombre del examen es necesario';
            error = true;
        }
        if(groupId === ''){
            legend = 'Selecciona el grupo';
            error = true;
        }
        if(questionList.length <= 0){
            legend = 'Ingresa al menos una pregunta al exámen';
            error = true;
        }
        if(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: legend
            });
            return;
        }

        test.questionList = questionList;
        if(test.isEditing){
            legend = 'Se ha editado el exámen';
            saveEditTest(test);
            console.log(saveEditTest);
        }else{
            test._id = uuidv4();
            setNewTest(test);
            legend = 'Se ha agregado el exámen';
        }
        history.push('/tests');
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: legend,
            showConfirmButton: false,
            timer: 3000
        });
    }

    const onHandleChange = (e) => {
        setTest({
            ...test,
            [e.target.name]: e.target.name.includes('date') ? getObjectDate(e.target.value): e.target.value
        })
    }

    const onHandleChangeTime = (e) => {
        setTest({
            ...test,
            time: {
                ...time,
                [e.target.name]: e.target.value
            }
        })
    }

    const showCreateQuestionView = (e) => {
        e.preventDefault();
        setCreate(true);
    }

    const addQuestionToList = (question) => {
        let legend;
        if(create){
            question._id = uuidv4();
            setTest({
                ...test,
                questionList:[...questionList, question]
            })
            setCreate(false);
            legend = 'creado';
        }else if(edit){
            let newList = questionList.filter((questionSave) => {
                if(questionSave._id === question._id){
                    questionSave.question = question.question;
                    questionSave.listAnswer = question.listAnswer;
                    questionSave.isEditing = false;
                }
                return true;
            });
            setTest({
                ...test,
                questionList: newList
            })
            setEdit(false);
            legend = 'editado';
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha ${legend} la pregunta`,
            showConfirmButton: false,
            timer: 3000
        });
    }

    const deleteQuestion = (id) => {
        let questionToDelete = questionList.filter((question) => (question._id === id))[0];
        let newList = questionList.filter((question) => (question._id !== id));
        if(questionToDelete.isEditing){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Estas editando esta pregunta, terminala o cancelala para poder editar'
            });
            return;
        }
        setTest({
            ...test,
            questionList: newList
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha eliminado la pregunta',
            showConfirmButton: false,
            timer: 3000
        });
    }

    const editQuestion = (id) => {
        if(create){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Estas creando una pregunta, terminala o cancelala para poder editar'
            });
            return;
        }
        if(edit){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Estas editando una pregunta, terminala o cancelala para poder editar'
            });
            return;
        }
        let questionToEdit = questionList.filter((question) => (question._id === id))[0];
        questionToEdit.isEditing = true;
        setEdit(true);
        setQuestionEdit(questionToEdit);
    }

    const cancelEditOrCreate = () => {
        setEdit(false);
        setCreate(false);
    }

    if(userGroups.length <= 0){
        return <Loader/>
    }    

    return (
        <form
            className="mt-5 mb-5"
        >
            <CardContainer className="card text-center mx-auto">
                <div className="card-body px-5">
                    <h4 className="card-title">{activeTest.isEditing ? 'Ingresa los nuevos valores del exámen' : 'Crea un nuevo exámen'}</h4>
                    <div className="form-group text-left">
                        <label htmlFor="nameTest">Nombre del exámen</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="nameTest" 
                            id="nameTest"
                            value={nameTest}
                            onChange={onHandleChange}
                            placeholder="Ingresa el nombre del exámen"
                        />
                    </div>
                    <div className="form-group text-left">
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="dateIn">Fecha de inicio</label>
                                <input
                                    type="date"
                                    name="dateIn"
                                    id="dateIn"
                                    value={getFormatDate(dateIn)}
                                    onChange={onHandleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="dateOut">Fecha de termino</label>
                                <input
                                    type="date"
                                    name="dateOut"
                                    id="dateOut"
                                    value={getFormatDate(dateOut)}
                                    onChange={onHandleChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="hourIn">Hora de inicio</label>
                                <input 
                                    type="time" 
                                    name="hourIn"
                                    id="hourIn"
                                    value={hourIn}
                                    onChange={onHandleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="hourOut">Hora de termino</label>
                                <input 
                                    type="time" 
                                    name="hourOut"
                                    id="hourOut"
                                    value={hourOut}
                                    onChange={onHandleChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <label>Tiempo</label>
                        <div className="row">
                            <div className="col-6">
                                <input 
                                    type="number" 
                                    name="number"
                                    id="number"
                                    className="form-control"
                                    min="1"
                                    max={time.type === 'h' ? '24': '60'}
                                    value={time.number}
                                    onChange={onHandleChangeTime}
                                />
                            </div>
                            <div className="col-6">
                                <select
                                    className="form-control"
                                    name="type"
                                    id="type"
                                    value={time.type}
                                    onChange={onHandleChangeTime}
                                >
                                    <option value="">-- Seleccionar --</option>
                                    <option value="m">Minutos</option>
                                    <option value="h">Horas</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="rol">Selecciona el grupo</label>
                        <select
                            className="form-control"
                            name="groupId"
                            id="group"
                            value={groupId}
                            onChange={onHandleChange}
                        >
                            <option value="">-- Seleccionar --</option>
                            {userGroups.map((group) => (
                                <option key={group._id} value={group._id}>{group.groupName}</option>
                            ))}
                        </select>
                    </div>
                    <Accordion
                        data={questionList}
                        deleteQuestion={deleteQuestion}
                        editQuestion={editQuestion}
                    />
                    {!create && !edit ?
                        <div className="form-group text-left">
                            <button
                                className="btn btn-block btn-primary"
                                onClick={showCreateQuestionView}
                            >
                                <i className="fas fa-plus"></i> Agregar pregunta
                            </button> 
                        </div>
                        :
                        <FormAddQuestion
                            addQuestionToList={addQuestionToList}
                            questionEdit={edit ? questionEdit : null}
                            cancelEditOrCreate={cancelEditOrCreate}
                        />
                    }
                    <div className="form-group text-left">
                        <button
                            type="submit"
                            className="btn btn-block btn-success"
                            onClick={onHandleClickSaveTest}
                        >
                            <h6>Guardar exámen</h6>
                        </button> 
                    </div>   
                </div>
            </CardContainer>
        </form>
    );
}
 
export default FormNewTest;