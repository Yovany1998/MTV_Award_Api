const express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");

let categoryClass = require('./nominations.model.js');
let categoryModel = new categoryClass();


router.get('/', (req, res, nex)=>{
    res.status(200).json({msg:"Users index"})
})

router.post('/category/artistyear', async (req, res, next) => {
    try {
        const {artistName, nomination, image, totalVotes, categories} = req.body;
        let categoryAdded = await categoryModel.createArtist(artistName, nomination, image, totalVotes, categories);
        //delete categoryAdded.password;
        console.log(categoryAdded);
        res.status(200).json({"msg":"Artista Agregado Satisfactoriamente"});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({"msg":"Error al momento de ingresar al artista, revisa que la informacion este correcta porfavor."});
    }
});
module.exports = router;