import React, { useReducer } from 'react';
import GroupReducer from './GroupReducer';
import GroupContext from './GroupContext';
import publicGroupsList from '../../db/GruposPub.json';
import userGroupsList from '../../db/GruposUsuario.json';
import {
    SEARCH_GROUP,
    ADD_GROUP,
    OUT_GROUP,
    SET_OUT,
    SELECT_LIST,
    SET_NEW,
    LOAD_GROUPS
} from '../../Types/Group';

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
    const loadGroups = (user) => {
        //Consulta a la api
        setTimeout(() => {
            dispatch({
                type:LOAD_GROUPS,
                payload: {
                    publicGroupsList,
                    userGroupsList
                }
            })
        }, 2000);
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

    const setNewGroup = (group) => {
        console.log(group);
        //Se manda a la api y regresa la lista completa
        group._id = state.allgroups.length + 1;
        group.code = `codegroupnew${group._id}`;
        let listUpdated = [...state.allgroups, group];
        let listPublicUpdated = group.public ? [...state.publicGroups, group] : state.publicGroups;
        dispatch({
            type: SET_NEW,
            payload: {
                all: listUpdated,
                public: listPublicUpdated,
                group
            }
        })
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
                loadGroups
            }}
        >
            {props.children}
        </GroupContext.Provider>
    );
}

export default GroupState;