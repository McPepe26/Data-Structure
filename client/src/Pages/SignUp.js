import React, {useEffect} from 'react';
import {useSpring, animated} from 'react-spring';
import FormSignUp from '../Components/FormSignUp';
import { calcPositionFooter } from '../Helpers/FooterHelpers';

const SignUp = ({history}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    useEffect(() => {
        calcPositionFooter();
    });

    return (
        <animated.div className="transition-class" style={props}>
            <div className="container">
                <FormSignUp
                    history={history}
                />
            </div>
        </animated.div>
    );
}
 
export default SignUp;