import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../Context/User/UserContext';

const PrivateRoute = ({ component: Component, ...props  }) => {
    const userContext = useContext(UserContext);
    const { isLogged } = userContext;

    return (
        <Route 
            { ...props } 
            render={ props => !isLogged ?  
                (<Redirect to="/" />)
                : 
                (<Component {...props} />)
            } 
        />

    );
}
 
export default PrivateRoute;