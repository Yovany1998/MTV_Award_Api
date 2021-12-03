var conexion = require('../../../utility/dao');
const bcrypt = require("bcryptjs");
var ObjectID = require('mongodb').ObjectId;
var _db;

class Nominations{
    userColl = null;
    nominationColl = null;
    constructor() {
        this.initModel();
    }

    async initModel(){
        try {
            _db = await conexion.getDB();
            this.userColl = await _db.collection("user");
            this.nominationColl = await _db.collection("nomination")
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    async getAll(){
      let nominations = await this.nominationColl.find({},);
      return nominations.toArray();
    }

    async sendVotes(idUser,totalVotes, idNomination){
        try {
          //Users
          //Agregando el tiempo de votacion
          let filterUser ={"_id": new ObjectID(idUser)}

          let updateJsonUser = {
            "$set":{
                horaDeVotacion: new Date().getTime(),
                horaDeDisponibilidad: new Date().getTime()+(1*24*60*60*1000)} 
          }
          let resultUser = await this.userColl.updateOne(filterUser,updateJsonUser);
          
          //Nomination
          let filterNomination ={"_id": new ObjectID(idNomination)}
          const lastTotalVotes = await this.nominationColl.findOne(filterNomination);

          //Suma de los votos actuales con los nuevos
          let updateJsonNomination = {
            "$set":{totalVotes: parseInt(totalVotes) + parseInt(lastTotalVotes.totalVotes)}            
          }
          let resultNomination  = await this.nominationColl.updateOne(filterNomination, updateJsonNomination) 
          return resultUser + resultNomination; 
          
        } catch(ex) {
          console.log(ex);
          throw(ex);
        }
      }    
}

module.exports = Nominations;