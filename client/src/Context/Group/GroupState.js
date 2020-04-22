import React, { useReducer } from 'react';
import GroupReducer from './GroupReducer';
import GroupContext from './GroupContext';
import publicGroupsList from '../../db/GruposPub.json';
import userGroupsList from '../../db/GruposUsuario.json';
import { clientAxios, tokenAuth } from '../../Helpers/AuthHelpers';
import {
    SEARCH_GROUP,
    ADD_GROUP,
    OUT_GROUP,
    SET_OUT,
    SELECT_LIST,
    SET_NEW,
    LOAD_GROUPS,
    DELETE_GROUP
} from '../Types/Group';

const GroupState = (props) => {
    const initialState = {
        allgroups: [],
        publicGroups: [],
        userGroups: [],
        foundGroup: null,
        outAction: false,
        list: null
    }

    const [state, dispatch] = useReducer(GroupReducer, initialState);

    //Fn's
    const loadGroups = async () => {
        //Consulta a la api
        try{
            const headers = {
                'Content-Type': 'application/json'
            }

            let token = localStorage.getItem('token');
            if(token){
                tokenAuth(token);
            }else{
                return 'No estas autenticado, intenta iniciar sesión de nuevo';
            }

            const response = await clientAxios.get('/api/group/', headers);
            const { data } = response;
            if(data.ok){        
                dispatch({
                    type:LOAD_GROUPS,
                    payload: {
                        publicGroupsList: data.groupListPublic,
                        userGroupsList: data.groupList
                    }
                })
            }else{
                if(data.err)
                    return data.err.message;
                else if(data.error){
                    return data.error.message.split(':')[2];
                }
            }
        }catch(err){
            console.log(err);
            return 'Ha ocurrido un error en el servidor';
        }
    }

    const consulthGroup = (code) => {
        //Consulta a la api
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const search = state.userGroups.filter((group) => group.code === code);
                if(search.length > 0){
                    console.log(search);
                    reject('Ya estas inscrito es ese grupo');
                    return;
                }
                const result = state.allgroups.filter((group) => group.code === code);
                if(result.length > 0){
                    dispatch({
                        type: SEARCH_GROUP,
                        payload: result
                    });
                    resolve(result);
                }else{
                    reject('No se pudo encontrar el grupo');
                }
            }, 5000);
        });
    }

    const searchGroup = (key, isOut) => {
        let search;
        if(!isOut){
            search = state.publicGroups.filter((group) => group.code === key);
        }else{
            search = state.userGroups.filter((group) => group.code === key);
        }
        if(search.length > 0){
            dispatch({
                type: SEARCH_GROUP,
                payload: search
            });
        }

        return (search.length > 0);
    }

    const addGroup = (group) => {
        //Consulta a la api
        dispatch({
            type: ADD_GROUP,
            payload: group
        })
    }

    const outGroup = (group) => {
        //Consulta a la api
        dispatch({
            type: OUT_GROUP,
            payload: group[0]
        });
    }

    const setOut = (value) => {
        dispatch({
            type: SET_OUT,
            payload: value
        });
    }

    const searchGroupByName = (name) => {
        let list = null;
        if(name !== ""){
            list = state.publicGroups.filter((group) => group.groupName.toLowerCase().includes(name.toLowerCase()));
        }
        dispatch({
            type: SELECT_LIST,
            payload: list
        });
    }

    const deleteGroup = async (id) => {
        try{
            const headers = {
                'Content-Type': 'application/json'
            }

            let token = localStorage.getItem('token');
            if(token){
                tokenAuth(token);
            }else{
                return 'No estas autenticado, intenta iniciar sesión de nuevo';
            }

            const response = await clientAxios.delete(`/api/group/${id}`, headers);
            const { data } = response;
            if(data.ok){        
                dispatch({
                    type: DELETE_GROUP,
                    payload: data.groupDelete
                });
            }else{
                if(data.err)
                    return data.err.message;
                else if(data.error){
                    return data.error.message.split(':')[2];
                }
            }
        }catch(err){
            console.log(err);
            return 'Ha ocurrido un error en el servidor';
        }
    }

    const setNewGroup = async (group) => {
        //Se manda a la api y regresa la lista completa
        try{
            const headers = {
                'Content-Type': 'application/json'
            }

            let token = localStorage.getItem('token');
            if(token){
                tokenAuth(token);
            }else{
                return 'No estas autenticado, intenta iniciar sesión de nuevo';
            }

            const response = await clientAxios.post('/api/group/create', group, headers);
            const { data } = response;
            if(data.ok){
                let listPublicUpdated = group.public ? [...state.publicGroups, data.group] : state.publicGroups;
        
                dispatch({
                    type: SET_NEW,
                    payload: {
                        public: listPublicUpdated,
                        group: data.group
                    }
                });
            }else{
                if(data.err)
                    return data.err.message;
                else if(data.error){
                    return data.error.message.split(':')[2];
                }
            }
            
        }catch(err){
            console.log(err);
            return 'Ha ocurrido un error en el servidor';
        }
        
    }

    return(
        <GroupContext.Provider
            value={{
                publicGroups: state.publicGroups,
                userGroups: state.userGroups,
                foundGroup: state.foundGroup,
                outAction: state.outAction,
                list: state.list,
                consulthGroup,
                addGroup,
                searchGroup,
                outGroup,
                setOut,
                searchGroupByName,
                setNewGroup,
                loadGroups,
                deleteGroup
            }}
        >
            {props.children}
        </GroupContext.Provider>
    );
}

export default GroupState;