import {
    LOGIN_USER,
    SIGN_UP
} from '../Types/User'

export default (state, action) => {
    switch (action.type) {
        case SIGN_UP:
        case LOGIN_USER:
            return{
                ...state,
                user: action.payload,
                isLogged: true
            }
        default:
            return state;
    }

}