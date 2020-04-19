import React from 'react';
import {useSpring, animated} from 'react-spring';
import FormNewTest from '../Components/FormNewTest';


const NewTest = ({history}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    return (
        <animated.div className="transition-class" style={props}>
            <div className="container pb-5">
                <FormNewTest
                    history={history}
                />
            </div>
        </animated.div>
    );
}
 
export default NewTest;