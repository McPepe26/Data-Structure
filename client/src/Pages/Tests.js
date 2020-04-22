import React, { useContext, useEffect } from 'react';
import {useSpring, animated} from 'react-spring';
import SwalCreate from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import UserContext from '../Context/User/UserContext';
import TestContext from '../Context/Test/TestContext';
import { calcPositionFooter } from '../Helpers/FooterHelpers';
import Header from '../Components/Header';
import List from '../Components/List';
import { isTestClosed } from '../Helpers/TestHelpers';

const Tests = ({history}) => {
    const Swal = withReactContent(SwalCreate);
    //User context
    const { user } = useContext(UserContext);
    const { rol } = user;

    const props = useSpring({opacity: 1, from: {opacity: 0}});

    const testContext = useContext(TestContext);
    const { testList, consultTest, setEditTest, deleteTest } = testContext;
    useEffect(() => {
        consultTest();
    }, []);

    // eslint-disable-next-line
    useEffect(() => {
        calcPositionFooter();
    });
    
    const onDeleteTest = async (e) => {
        e.preventDefault();
        let message = await deleteTest(e.target.name);
        if(message){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message
            });
            return;
        }
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha eliminado el exámen',
            showConfirmButton: false,
            timer: 3000
        });
    }

    const showStatistics = (e) => {
        e.preventDefault();
        history.push(`/showtest/${e.target.name}`);
    }

    const doTest = (e) => {
        e.preventDefault();
        history.push(`/dotest/${e.target.name}`);
    }

    const showAnswers = (e) => {
        e.preventDefault();
        const test = testList.filter((test) => test._id === e.target.name)[0];
        if(isTestClosed(test.dateOut, test.hourOut)){
            history.push(`/answer/${e.target.name}`);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Aún esta activa esta evaluación, espera a que termine para saber tu calificación'
            });
        }
    }

    const contentTeacherTests = {
        title: "Exámenes que has creado",
        type: 'simple',
        legend1: 'nameTest',
        buttons: [
            {
                text: "Editar",
                style: 'btn-secondary',
                isLink: true
            },
            {
                text: "Eliminar",
                style: 'btn-danger',
                action: onDeleteTest
            }
        ],
        data: testList.filter((test) => !isTestClosed(test.dateOut, test.hourOut))
    }

    const contentTeacherTestsClosed = {
        title: "Exámenes que has creado",
        type: 'simple',
        legend1: 'nameTest',
        buttons: [
            {
                text: "Ver estadisticas",
                style: 'btn-secondary',
                action: showStatistics
            }
        ],
        data: testList.filter((test) => isTestClosed(test.dateOut, test.hourOut))
    }

    const contentStudentTests = {
        title: "Exámenes activos",
        type: 'simple',
        legend1: 'nameTest',
        buttons: [
            {
                text: "Realizar",
                style: 'btn-secondary',
                action: doTest
            }
        ],
        data: testList.filter((test) => !isTestClosed(test.dateOut, test.hourOut) && !test.doIt)
    }

    const contentStudentTestsClosed = {
        title: "Exámenes que has hecho",
        type: 'simple',
        legend1: 'nameTest',
        buttons: [
            {
                text: "Ver respuestas",
                style: 'btn-secondary',
                action: showAnswers
            }
        ],
        data: testList.filter((test) => isTestClosed(test.dateOut, test.hourOut) || test.doIt)
    }
    
    return (
        <animated.div className="transition-class" style={props}>
            <Header
                title="Exámenes"
            />
            <div className="container p-4">
                <div className="row">
                    <div className="col-10 mx-auto">
                        {rol === 'teacher' ? 
                            <div className="col-3 offset-9 mb-2">
                                <Link 
                                    to="/createTest"
                                    className="btn btn-block btn-success"
                                >Crear exámen</Link>
                            </div>
                            :
                            null
                        }
                        <List
                            content={rol === 'teacher' ? contentTeacherTests : contentStudentTests}
                        />
                        <List
                            content={rol === 'teacher' ? contentTeacherTestsClosed : contentStudentTestsClosed}
                        />
                    </div>
                </div>
            </div>
        </animated.div>
    );
}
 
export default Tests;