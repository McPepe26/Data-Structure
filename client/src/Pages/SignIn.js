import React, {useEffect} from 'react';
import {useSpring, animated} from 'react-spring';
import FormSignIn from '../Components/FormSignIn';
import { calcPositionFooter } from '../Helpers/FooterHelpers';

const SignIn = ({signin, history}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    useEffect(() => {
        calcPositionFooter();
    });
    
    return (
        <animated.div className="transition-class" style={props}>
            <div className="container">
                <FormSignIn
                    signin={signin}
                    history={history}
                />
            </div>
        </animated.div>
    );
}
 
export default SignIn;