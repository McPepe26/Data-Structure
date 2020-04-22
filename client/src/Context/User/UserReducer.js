import {
    LOGIN_USER,
    SIGN_UP,
    SIGN_OUT
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
        case SIGN_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: {
                    name: '',
                    edad: '',
                    rol: '',
                    school: ''
                },
                isLogged: false
            }
        default:
            return state;
    }

}