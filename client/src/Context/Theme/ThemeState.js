import React, { useReducer } from 'react';
import ThemeReducer from './ThemeReducer';
import ThemeContext from './ThemeContext';
import themesData from '../../db/Temas.json';
import {
    SELECT_THEME,
    LOADING
} from '../Types/Theme';

const ThemeState = (props) => {
    const intialState = {
        themes: themesData,
        loadTheme: false,
        themeSelected: null
    }

    const [state, dispatch] = useReducer(ThemeReducer, intialState);

    //Fn's
    const selectTheme= (theme) => {
        setTimeout(() => {
            dispatch({
                type: SELECT_THEME,
                payload: theme
            })
        }, 5000);
    }

    const setLoading = (value) => {
        dispatch({
            type: LOADING,
            payload: value
        })
    }
    return(
        <ThemeContext.Provider
            value={{
                themes: state.themes,
                themeSelected: state.themeSelected,
                loadTheme: state.loadTheme,
                selectTheme,
                setLoading
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeState;