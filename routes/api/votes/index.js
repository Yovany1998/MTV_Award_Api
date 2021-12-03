const cors = require('cors');
const express = require("express");
let router = express.Router();

let votesClass = require('./votes.model.js');
let votesModel = new votesClass();

router.use(cors());

router.get('/', (req, res, nex)=>{
    res.status(200).json({msg:"Users index"})
})

router.get('/all', async (req,res,next)=>{
    try {
        const allNominations = await votesModel.getAll();
        return res.status(200).json(allNominations);
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({msg:"Error al procesar peticion"});
    }
});

router.post('/sendvotes', async (req, res, next) => {
    try {
        const {totalVotes, idNomination} = req.body;
        const id = req.user._id;
        let votesAdded = await votesModel.sendVotes(id,totalVotes, idNomination);
        
        console.log(votesAdded);
        res.status(200).json({"msg":"Votos enviados."});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({"msg":"Error al momento de enviar los votos."});
    }
});
module.exports = router;