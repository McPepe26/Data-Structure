import React, {useEffect} from 'react';
import {useSpring, animated} from 'react-spring';
import FormSignIn from '../Components/FormSignIn';

const SignIn = ({setProperty, signin, history}) => {
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
                <FormSignIn
                    signin={signin}
                    history={history}
                />
            </div>
        </animated.div>
    );
}
 
export default SignIn;