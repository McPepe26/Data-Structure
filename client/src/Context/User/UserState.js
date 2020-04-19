import React, { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import {
    LOGIN_USER,
    SIGN_UP
} from '../Types/User'

const UserState = (props) => {
    const initialState = {
        isLogged: false,
        user: {
            name: '',
            edad: '',
            rol: '',
            school: ''
        },
        token: ''
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    //Fn's
    const loginUser = (user) => {
        //Request a la api y guardar en localstorage el token
        let userData = {
            name: 'Pepe',
            edad: '20',
            rol: 'student',
            school: 'UPT'
        }
        dispatch({
            type: LOGIN_USER,
            payload: userData
        });
    }

    const signUpUser = (userData) => {
        //Mandamos la data a la api
        let user = {
            name: 'Pepe',
            edad: '20',
            rol: 'student',
            school: 'UPT'
        }
        dispatch({
            type: SIGN_UP,
            payload: user
        })
    }

    return(
        <UserContext.Provider
            value={{
                user: state.user,
                isLogged: state.isLogged,
                loginUser,
                signUpUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;
