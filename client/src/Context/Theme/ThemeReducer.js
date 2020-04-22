import {
    SELECT_THEME,
    LOADING
} from '../Types/Theme';

export default (state, action) => {
    switch (action.type) {
        case SELECT_THEME:
            return {
                ...state,
                themeSelected: action.payload,
                loadTheme: false
            }
        case LOADING:
            return {
                ...state,
                loadTheme: action.payload
            }
        default:
            return state;
    }

}