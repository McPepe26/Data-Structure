import React, { useContext, useEffect, useState } from 'react';
import {useSpring, animated} from 'react-spring';
import SwalCreate from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import Header from '../Components/Header';
import List from '../Components/List';
import UserContext from '../Context/User/UserContext';
import GroupContext from '../Context/Group/GroupContext';
import FormNewGroup from '../Components/FormNewGroup';
import { getGroupFromModal } from '../Helpers/GroupHelepers';

const Gropus = () => {
    const Swal = withReactContent(SwalCreate)

    const props = useSpring({opacity: 1, from: {opacity: 0}});

    //User context
    const { user } = useContext(UserContext);
    const { rol } = user;

    //Group context
    const groupContext = useContext(GroupContext);
    const { publicGroups, userGroups, foundGroup, consulthGroup, 
            addGroup, searchGroup, outAction, outGroup, setOut, 
            searchGroupByName, list, setNewGroup } = groupContext;

    useEffect(() => {
        if(foundGroup){
            if(!outAction){
                addGroup(foundGroup);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Te has inscrito al grupo',
                    showConfirmButton: false,
                    timer: 3000
                });
            }else{
                outGroup(foundGroup);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: rol === 'student' ? 'Has salido del grupo' : 'Se ha eliminado el grupo satisfactoriamente',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        }
    }, [foundGroup]);

    const onHandleClickEnterGroup = (e) => {
        searchGroup(e.target.name);
    }

    const onHandleClickOutGroup = (e) => {
        setOut(true);
        searchGroup(e.target.name, true);
    }

    const onHandleClickAddGroup = () => {
        const config = {
            title: 'Ingresa el código del grupo',
            input: 'text',
            inputPlaceholder: '#Codigo',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'El código del grupo es necesario'
                }
            },
            confirmButtonText: 'Enviar',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return consulthGroup(login)
                .then((response) => {
                    return response;
                })
                .catch((err) => {
                    Swal.showValidationMessage(
                        `${err}`
                    );
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        };
        Swal.fire(config);
    }

    const searchByName = (value) => {
        searchGroupByName(value);
    }

    const onHandleClickCreateGroup = () => {
        const config = {
            title: 'Crea un nuevo grupo',
            html: <FormNewGroup />,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let group = getGroupFromModal();
                if(group.groupName === ""){
                    Swal.showValidationMessage("El nombre del grupo es requerido");
                    return;
                }
                setNewGroup(group);
            },
            allowOutsideClick: () => !Swal.isLoading()
        };
        Swal.fire(config);
    }

    const contentStudentGrops = {
        title: "Grupos en los que estas",
        type: 'simple',
        legend1: 'groupName',
        buttons: [
            {
                text: "Salir",
                style: 'btn-danger',
                action: onHandleClickOutGroup
            }
        ],
        data: userGroups
    }

    const contentTeacherGrops = {
        title: "Grupos que has creado",
        type: 'double',
        legend1: 'groupName',
        legend2: 'code',
        buttons: [
            {
                text: "Eliminar",
                style: 'btn-danger',
                action: onHandleClickOutGroup
            }
        ],
        data: userGroups
    }

    const contentPublicGrops = {
        title: "Grupos públicos",
        type: 'double',
        legend1: 'groupName',
        legend2: 'code',
        inputData: {
            textInput: 'Buscar grupos por nombre',
            onChange: searchByName
        },
        buttons: [
            {
                text: "Entrar",
                style: 'btn-success',
                action: onHandleClickEnterGroup
            }
        ],
        data: list ? list : publicGroups
    }

    return (
        <animated.div className="transition-class" style={props}>
            <Header
                title="Grupos"
            />
            <div className="container p-4">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="col-3 offset-9 mb-2">
                            <button 
                                type="button" 
                                className="btn btn-block btn-success"
                                onClick={rol === 'student' ? onHandleClickAddGroup: onHandleClickCreateGroup}
                            >
                                {rol === 'student' ? 'Agregar grupo' : 'Crear grupo'}
                            </button>
                        </div>
                        <List
                            content={rol === 'student' ? contentStudentGrops : contentTeacherGrops}
                        />

                        {rol === 'student' ? 
                            <List
                                title="Grupos públicos"
                                content={contentPublicGrops}
                            />
                            : 
                            null
                        }
                    </div>
                </div>
            </div>
        </animated.div>    
    );
}
 
export default Gropus;