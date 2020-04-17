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
            <div className="form-group text-left pl-4">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value=""
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Privado
                </label>
            </div>
        </Fragment>
    );
}
 
export default FormNewGroup;