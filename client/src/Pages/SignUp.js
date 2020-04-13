import React, {useEffect} from 'react';
import {useSpring, animated} from 'react-spring';
import FormSignUp from '../Components/FormSignUp';

const SignUp = ({setProperty, history}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    useEffect(() => {
        let height = (document.body.clientHeight);
		let heightWindow = window.innerHeight;
		console.log(height, heightWindow, (heightWindow > height));
        if(heightWindow > height)
			setProperty("sticky-footer");
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