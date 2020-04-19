import {
    SET_LIST_TEST,
    SET_NEW_TEST,
    SET_EDIT_TEST,
    DELETE_TEST,
    SET_DOING_TEST,
    SET_ANSWER_USER
} from '../../Types/Test';

export default (state, action) => {
    switch (action.type) {
        case SET_LIST_TEST:
            return {
                ...state,
                testList: action.payload
            }
        case SET_NEW_TEST:
            return {
                ...state,
                testList: [...state.testList, action.payload]
            }
        case SET_EDIT_TEST: 
            let index = state.testList.indexOf(action.payload);
            state.testList.splice(index, 1, action.payload);

            return {
                ...state
            }
        case DELETE_TEST:
            return {
                ...state,
                testList: state.testList.filter((test) => test._id !== action.payload)
            }
        case SET_DOING_TEST:
            return{
                ...state,
                activeTest: action.payload,
                isLoading: false
            }
        case SET_ANSWER_USER:
            let indexActivetest = state.testList.indexOf(state.activeTest);
            console.log(indexActivetest)
            state.testList[indexActivetest].doIt = true;
            return {
                ...state,
                answerListUser: action.payload
            }
        default:
            return state;
    }
}