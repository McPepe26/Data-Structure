import React, {useState} from 'react';
import styled from 'styled-components';
import SwalCreate from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CardContainer = styled.div`
    max-width: 60%;
`;

const FormSignUp = ({onSignUpUser}) => {
    const Swal = withReactContent(SwalCreate);
    const [user, setUser] = useState({
        user: '',
        email: '',
        password: '',
        passwordConfirm: '',
        date: '',
        rol: '',
        school: ''
    });

    const login = (e) => {
        e.preventDefault();
        if(user.user === '' ||
            user.email === '' ||
            user.password === '' ||
            user.passwordConfirm === '' ||
            user.date === '' ||
            user.rol === '' ||
            user.school === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son requeridos'
            });
            return;
        }else if(user.password !== user.passwordConfirm){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coincidens'
            });
            return;
        }
        onSignUpUser(user);
    }

    const handleChangeData = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    return (
        <form 
            className="mt-5 mb-5"
            onSubmit={login}
        >
            <CardContainer className="card text-white text-center bg-warning mx-auto">
                <div className="card-body pt-0 px-5">
                    <span className="text-size-medium"><i className="fas fa-user-plus"></i></span>
                    <h4 className="card-title">Ingresa tus datos para registrarte</h4>
                    <div className="form-group text-left">
                        <label htmlFor="email">Correo Electronico</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            id="email"
                            placeholder="Ingresa tu correo electrónico"
                            onChange={handleChangeData}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password" 
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            onChange={handleChangeData}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="passwordConfirm">Confirma tu contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="passwordConfirm" 
                            id="passwordConfirm"
                            placeholder="Ingresa nuevamente tu contraseña"
                            onChange={handleChangeData}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="user">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="user" 
                            id="user"
                            placeholder="Ingresa tu nombre"
                            onChange={handleChangeData}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="date">Fecha de nacimiento</label>
                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            onChange={handleChangeData}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="rol">Rol</label>
                        <select
                            className="form-control"
                            name="rol"
                            id="rol"
                            onChange={handleChangeData}
                        >
                            <option value="">-- Seleccionar --</option>
                            <option value="teacher">Profesor</option>
                            <option value="student">Estudiante</option>
                        </select>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="school">Escuela</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="school" 
                            id="school"
                            placeholder="Ingresa la escuela a la que perteneces"
                            onChange={handleChangeData}
                        />
                    </div>
                    <div className="form-group text-left">
                        <button
                            type="submit"
                            className="btn btn-block btn-primary"
                        >
                            <h6>Registrarme</h6>
                        </button> 
                    </div>
                </div>
                
            </CardContainer>
        </form>
    );
}
 
export default FormSignUp;