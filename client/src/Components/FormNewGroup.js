import React, { Fragment } from 'react';

const FormNewGroup = () => {
    return (
        <Fragment>
            <div className="form-group text-left">
                <label htmlFor="groupName">Nombre del grupo</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="groupName"
                    id="groupName"
                    placeholder="Ingresa tu correo electrónico"
                />
            </div>
            <div className="form-group text-left">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="public"/>
                    <label className="custom-control-label" htmlFor="public">Privado</label>
                </div>
            </div>
        </Fragment>
    );
}
 
export default FormNewGroup;