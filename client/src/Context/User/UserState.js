import React, { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import { clientAxios, tokenAuth, tokenExists } from '../../Helpers/AuthHelpers';
import {
    LOGIN_USER,
    SIGN_UP,
    SIGN_OUT
} from '../Types/User'

const UserState = (props) => {
    const initialState = {
        isLogged: tokenExists(),
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
    const loginUser = async (user) => {
        //Request a la api y guardar en localstorage el token
        try{
            const headers = {
                'Content-Type': 'application/json'
            }
            const response = await clientAxios.post('/api/user/login', user, headers);
            const { data } = response;
            if(data.ok){
                dispatch({
                    type: LOGIN_USER,
                    payload: data.user
                });
                localStorage.setItem('token', data.token);
            }else{
                if(data.err)
                    return data.err.message;
                else if(data.error){
                    return data.error.message.split(':')[2];
                }
            }
            
        }catch(err){
            console.log(err);
            return 'Ha ocurrido un error en el servidor';
        }
    }

    const loginUserToken = async () => {
        try{
            const headers = {
                'Content-Type': 'application/json'
            }
            let token = localStorage.getItem('token');
            if(token){
                tokenAuth(token);
            }else{
                return;
            }
            const response = await clientAxios.get('/api/user/token', headers);
            const { data } = response;
            if(data.ok){
                dispatch({
                    type: LOGIN_USER,
                    payload: data.user
                });
            }else{
                if(data.err)
                    return data.err.message;
                else if(data.error){
                    return data.error.message.split(':')[2];
                }
            }
            
        }catch(err){
            console.log(err);
            return 'Ha ocurrido un error en el servidor';
        }
    }
 
    const signUpUser = async (userData) => {
        //Mandamos la data a la api
        try{
            const headers = {
                'Content-Type': 'application/json'
            }
            const response = await clientAxios.post('/api/user/', userData, headers);
            const { data } = response;
            if(data.ok){
                dispatch({
                    type: SIGN_UP,
                    payload: data.user
                })
                localStorage.setItem('token', data.token);
            }else{
                if(data.err)
                    return data.err.message;
                else if(data.error){
                    return data.error.message.split(':')[2];
                }
            }
            
        }catch(err){
            console.log(err);
            return 'Ha ocurrido un error en el servidor';
        }
        
    }

    const signOut = () => {
        dispatch({
            type: SIGN_OUT,
        })
    }

    return(
        <UserContext.Provider
            value={{
                user: state.user,
                isLogged: state.isLogged,
                loginUser,
                signUpUser,
                loginUserToken,
                signOut
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;
