const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/UserModel');

const UserController = {};

UserController.login = (req, res) => {
    let content = req.body;

    User.findOne({email: content.email}, (err, userDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        if(!userDB){
            return res.json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if(!bcrypt.compareSync(content.password, userDB.password)){
            return res.json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, {expiresIn: process.env.DEADLINE_TOKEN});
        res.json({
            ok: true,
            user: userDB,
            token
        });
    }); 
}

UserController.loginWithToken= async (req, res) => {
    let user = req.user;
    res.json({
        ok: true,
        user
    });  
}

UserController.createUser = (req, res) => {
    let content = req.body;
    console.log(content)
    let newUser = new User({
        name: content.name,
        email: content.email,
        password: bcrypt.hashSync(content.password, 10),
        date: content.date,
        rol: content.rol,
        school: content.school,
    });

    newUser.save((err, userDB) => {
        if(err){
            return res.json({
                ok: false,
                error: err
            });
        }
        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, {expiresIn: process.env.DEADLINE_TOKEN});

        res.json({
            ok: true,
            user: userDB,
            token
        });
    });


}

module.exports = UserController;