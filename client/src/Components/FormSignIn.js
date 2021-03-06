import React, { useState } from 'react';
import styled from 'styled-components';
import SwalCreate from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CardContainer = styled.div`
    max-width: 60%;
`;

const FormSignIn = ({onLoginUser}) => {
    const Swal = withReactContent(SwalCreate);
    
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const login = (e) => {
        e.preventDefault();
        if(user.email === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tu correo es necesario'
            });
            return;
        }else if(user.password === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña es requerida'
            });
            return;
        }
        onLoginUser(user);
    }

    const handleChange = (e) => {
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
                    <span className="text-size-medium"><i className="fas fa-user"></i></span>
                    <h4 className="card-title">Ingresa tus datos para iniciar sesión</h4>
                    <div className="form-group text-left">
                        <label htmlFor="email">Correo Electronico</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            id="email"
                            placeholder="Ingresa tu correo electrónico"
                            onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <button
                            type="submit"
                            className="btn btn-block btn-primary"
                        >
                            <h6>Iniciar sesión</h6>
                        </button> 
                    </div>   
                </div>
                
            </CardContainer>
        </form>
    );
}
 
export default FormSignIn;