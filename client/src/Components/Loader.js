import React from 'react';
import '../Styles/Loader.css';

const Loader = ({name}) => {
    return (
        <div class="loader">Cargando {name}</div>
    );
}
 
export default Loader;