import {
    SEARCH_GROUP,
    ADD_GROUP,
    OUT_GROUP,
    SET_OUT,
    SELECT_LIST,
    SET_NEW,
    LOAD_GROUPS
} from '../../Types/Group';

export default (state, action) => {
    switch (action.type) {
        case SEARCH_GROUP:
            return {
                ...state,
                foundGroup: action.payload
            }
        case ADD_GROUP:
            return {
                ...state,
                userGroups: [...state.userGroups, action.payload[0]],
                publicGroups: state.publicGroups.filter((group) => group.code !== action.payload[0].code),
                foundGroup: null
            }
        case OUT_GROUP:
            let listGroups= state.publicGroups;
            if(action.payload.public){
                listGroups = [...state.publicGroups, action.payload];
            }
            return {
                ...state,
                publicGroups: listGroups,
                userGroups: state.userGroups.filter((group) => group.code !== action.payload.code),
                outAction: false,
                foundGroup: null
            }
        case SET_OUT:
            return {
                ...state,
                outAction: action.payload
            }
        case SELECT_LIST:
            return {
                ...state,
                list: action.payload
            }
        case SET_NEW:
            return {
                ...state,
                allgroups: action.payload.all,
                publicGroups: action.payload.public,
                userGroups: [...state.userGroups, action.payload.group]
            }
        case LOAD_GROUPS:
            return {
                ...state,
                allgroups: action.payload.publicGroupsList,
                publicGroups: action.payload.publicGroupsList.filter((group) => group.public === true),
                userGroups: action.payload.userGroupsList,
            }
        default:
            return state;
    }

}