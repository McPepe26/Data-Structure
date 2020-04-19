import React, { useReducer } from 'react';
import TestReducer from './TestReducer';
import TestContext from './TestContext';
import ListTest from '../../db/TestTeacher.json'
import {
    SET_LIST_TEST,
    SET_NEW_TEST,
    SET_EDIT_TEST,
    DELETE_TEST,
    SET_DOING_TEST,
    SET_ANSWER_USER
} from '../../Types/Test';

const TestState = (props) => {
    let today = new Date();
    const initialState = {
        testList: ListTest,
        answerList: [],
        isLoading: true,
        activeTest: {
            groupId:'',
            nameTest: "",
            doIt: false,
            dateIn: {
                year: today.getFullYear(),
                month: today.getMonth()+1,
                day: today.getDate()
            },
            dateOut: {
                year: today.getFullYear(),
                month: today.getMonth()+1,
                day: today.getDate()
            },
            hourIn: `${today.getHours() < 10 ? '0': ''}${today.getHours()}:00:00`,
            hourOut: `${today.getHours() < 10 ? '0': ''}${today.getHours()}:00:00`,
            time:{
                number: 1,
                type: 'h'
            },
            questionList: []
        }
    }

    const [state, dispatch] = useReducer(TestReducer, initialState);

    //Fn's
    const consultTest = () => {
        dispatch({
            type: SET_LIST_TEST,
            payload: ListTest
        })
    }

    const setDoingTest = (id) => {
        //traemos el test del api
        let test = state.testList.filter((test) => test._id === id)[0];
        dispatch({
            type: SET_DOING_TEST,
            payload: test
        })
    }

    const setNewTest = (test) => {
        //Se manda a la api
        dispatch({
            type: SET_NEW_TEST,
            payload: test
        })
    }

    const setEditTest = (id) => {
        let test = state.testList.filter((test) => (test._id === id))[0];
        if(test){
            test.isEditing = true;
        }
        return test;
    }

    const saveEditTest = (test) => {
        //Se manda a la api
        dispatch({
            type: SET_EDIT_TEST,
            payload: test
        })
    }

    const deleteTest = (id) => {
        //Se manda a la api
        dispatch({
            type:DELETE_TEST,
            payload: id
        })
    }

    const setAnswerUserList = (answerList) => {
        //Mandar a la api
        dispatch({
            type: SET_ANSWER_USER,
            payload: answerList
        })
    }

    return(
        <TestContext.Provider
            value={{
                testList: state.testList,
                questionList: state.questionList,
                answerList: state.answerList,
                activeTest: state.activeTest,
                isLoading: state.isLoading,
                consultTest,
                setNewTest,
                setEditTest,
                saveEditTest,
                deleteTest,
                setDoingTest,
                setAnswerUserList
            }}
        >
            {props.children}
        </TestContext.Provider>
    );
}

export default TestState;
