import React, {useEffect, useContext} from 'react';
import {useSpring, animated} from 'react-spring';
import FormSignIn from '../Components/FormSignIn';
import { calcPositionFooter } from '../Helpers/FooterHelpers';
import UserContext from '../Context/User/UserContext';

const SignIn = ({history, setIsUserLog}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    const userContext = useContext(UserContext);
    const { loginUser } = userContext;

    useEffect(() => {
        calcPositionFooter();
    });

    const onLoginUser = (userData) => {
        loginUser(userData);
        setIsUserLog(true);
        history.push('/groups');
    }
    
    return (
        <animated.div className="transition-class" style={props}>
            <div className="container pb-3">
                <FormSignIn
                    onLoginUser={onLoginUser}
                />
            </div>
        </animated.div>
    );
}
 
export default SignIn;