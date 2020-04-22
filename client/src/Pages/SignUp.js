import React, {useEffect, useContext} from 'react';
import {useSpring, animated} from 'react-spring';
import SwalCreate from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FormSignUp from '../Components/FormSignUp';
import UserContext from '../Context/User/UserContext';
import { calcPositionFooter } from '../Helpers/FooterHelpers';

const SignUp = ({history, setIsUserLog}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});
    const Swal = withReactContent(SwalCreate);

    const userContext = useContext(UserContext);
    const { signUpUser } = userContext;

    useEffect(() => {
        calcPositionFooter();
    });

    const onSignUpUser = async (user) => {
        let message = await signUpUser(user);
        if(message){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message
            });
            return;
        }
        setIsUserLog(true);
        history.push('/groups');
    }

    return (
        <animated.div className="transition-class" style={props}>
            <div className="container">
                <FormSignUp
                    onSignUpUser={onSignUpUser}
                />
            </div>
        </animated.div>
    );
}
 
export default SignUp;