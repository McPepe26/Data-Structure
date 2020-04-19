import React, { useState, useEffect, useContext } from 'react';
import {useSpring, animated} from 'react-spring';
import { useParams } from 'react-router-dom';
import SwalCreate from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';import { calcPositionFooter } from '../Helpers/FooterHelpers';
import { getTimeToString } from '../Helpers/TestHelpers'
import TestContext from '../Context/Test/TestContext';
import Loader from '../Components/Loader';

const DoTest = ({history}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});
    const Swal = withReactContent(SwalCreate);
    
    const testContext = useContext(TestContext);
    const { isLoading, setDoingTest, activeTest, setAnswerUserList } = testContext;
    const { time, questionList } = activeTest;
    const params = useParams();
    
    const [anserSelect, setAnswer] = useState('');
    const [ remainQuestions, setRemainQuestions] = useState(1);
    const [ startTest, setStartTest] = useState(false);
    const [ answerUser, setAnswerUser] = useState([]);


    useEffect(() => {
        calcPositionFooter();
        if(!isLoading && !startTest){
            let hours = 0;
            let minutes = 0;
            let seconds = 0;
            if(time.type === 'h'){
                hours = time.number;
            }else if(time.type === 'm'){
                minutes = time.number;
            }
            setInterval(() => {
                if(hours > 0 || minutes > 0 || seconds > 0){
                    if(seconds === 0){
                        seconds = 59;
                        if(minutes === 0){
                            minutes = 59;
                            if(hours > 0){
                                hours = hours-1;
                            }
                        }else{
                            minutes = minutes - 1;
                        }
                    }

                    seconds = seconds-1;

                    const view = document.getElementById('timeView');
                    if(view){
                        view.innerHTML = getTimeToString({hours, minutes, seconds});
                    }else{
                        clearInterval();
                    }
                    
                }else{
                    clearInterval();
                }
            }, 1000);
            setStartTest(true);
        }
    })

    useEffect(() => {
        setDoingTest(params.id);
    }, []);

    const onSelectAnswer = (e) => {
        e.preventDefault();
        if(anserSelect !== ''){
            let select = document.getElementById(anserSelect);
            select.classList.remove('active');
        }

        let selectNew = document.getElementById(e.target.id);
        selectNew.classList.add('active');
        setAnswer(e.target.id);
    }

    const onNextClick = (e) => {
        e.preventDefault();
        let select = document.getElementById(anserSelect);
        if(remainQuestions === questionList.length){
            let list = [...answerUser, select.name];
            setAnswerUserList(list);
            history.push('/tests');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se han guardado tus respuestas',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        if(anserSelect !== ''){
            setRemainQuestions(remainQuestions+1);
            select.classList.remove('active');
            setAnswer('');
            setAnswerUser([...answerUser, select.name]);
        }
    }

    if(isLoading){
        return <Loader/>
    }

    return (
        <animated.div className="transition-class" style={props}>
            <div className="p-5">
                <div className="row">
                    <div className="col-4">
                        <div className="card border-success mb-3">
                            <div className="card-body">
                                <div className="container">
                                    <div className="row bg-success p-3 text-white">
                                        Restan
                                        <span className="mx-auto" id="timeView">00:00:00</span>
                                    </div>
                                    <div className="row bg-primary p-3 text-white mt-3">
                                        Pregunta
                                        <span className="mx-auto">{`${remainQuestions}/${questionList.length}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="card border-success mb-3">
                            <div className="card-header">Pregunta {remainQuestions}</div>
                            <div className="card-body">
                                <div className="container">
                                    <h4 className="card-title">{questionList[remainQuestions-1].question}</h4>
                                    <div className="list-group">
                                        {questionList[remainQuestions-1].answerList.map((answer, index) => (
                                            <a 
                                                href="!#" 
                                                id={`answer${index}`}
                                                key={index}
                                                name={index}
                                                onClick={onSelectAnswer}
                                                className="list-group-item list-group-item-action"
                                            >
                                                {answer}
                                            </a>
                                        ))}
                                    </div>
                                    <button 
                                        className={`btn btn-success btn-block mt-4  ${anserSelect === '' ? 'disabled': ''}`}
                                        onClick={onNextClick}
                                    >
                                        {remainQuestions === questionList.length ? 'Enviar Respuestas' : 'Siguiente'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    );
}
 
export default DoTest;