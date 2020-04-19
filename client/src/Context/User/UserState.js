import React, { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';

const UserState = (props) => {
    const initialState = {
        isLogged: false,
        user: {
            name: 'Pepe',
            edad: '20',
            rol: 'student',
            school: 'UPT'
        }
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    //Fn's


    return(
        <UserContext.Provider
            value={{
                user: state.user,
                isLogged: state.isLogged
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState;
