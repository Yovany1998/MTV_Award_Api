const cors = require('cors');
const express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");

let userModelClass = require('./users.model.js');
let userModel = new userModelClass();

router.get('/', (req, res, nex)=>{
    res.status(200).json({msg:"Users index"})
})

router.use(cors());

router.post('/signin', async (req, res, next) => {
    try {
        const {email, pswd} = req.body;
        let userAdded = await userModel.createNewUser(email, pswd);
        delete userAdded.password;
        console.log(userAdded);
        res.status(200).json({"msg":"Usuario Creado Satisfactoriamente"});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({"msg":"Error"});
    }
});

router.post('/login', async (req, res, next)=>{
    try {
        const {email, pswd} = req.body;
        //Validar los datos
        let userLogged = await userModel.getByEmail(email);
        if (userLogged) {
            const isPswdOk = await userModel.comparePassword(pswd, userLogged.password);
            if (isPswdOk) {
                // podemos validar la vigencia de la contraseña
                delete userLogged.password;
                delete userLogged.oldpasswords;
                delete userLogged.lastlogin;
                delete userLogged.lastpasswordchange;
                delete userLogged.passwordexpires;
                let payload = {
                jwt: jwt.sign(
                    {
                        email: userLogged.email,
                        _id: userLogged._id,
                        roles: userLogged.roles
                    },
                    process.env.JWT_SECRET,
                    {expiresIn:'1d'}
                ),
                user: userLogged
            };
            return res.status(200).json(payload);
        }
    }
    console.log({email, userLogged});
    return res.status(400).json({msg: "Credenciales no son Válidas"});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({"msg":"Error"});
    }
});

module.exports = router;