let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let acceptRoles = {
    values: ['student', 'teacher'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required : [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatoria']
    },
    date: {
        type: String,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    rol: {
        type: String,
        default: 'student',
        enum: acceptRoles
    },
    school: {
        type: String,
        required: [true, 'Tu escuela actual es obligatoria']
    }
});


UserSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

UserSchema.plugin(uniqueValidator, {message: 'El {PATH} ya esta registrado'});

module.exports = mongoose.model('User', UserSchema);