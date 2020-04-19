import React from 'react';
import '../Styles/Loader.css';

const Loader = ({name}) => {
    return (
        <div className="loader">Cargando {name}</div>
    );
}
 
export default Loader;