var conexion = require('../../../utility/dao');
const bcrypt = require("bcryptjs");
var ObjectID = require('mongodb').ObjectId;
var _db;

class Nominations{
    secColl = null;
    constructor() {
        this.initModel();
    }

    async initModel(){
        try {
            _db = await conexion.getDB();
            this.secColl = await _db.collection("nomination");
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    async createArtist(artistName, nomination, image, totalVotes, categories){
        try {
          let nominations = {
            //id: new ObjectID(),
            artistName: artistName,
            nomination: nomination,
            image: image,
            totalVotes: totalVotes,
            categories: categories,
            
          }
          let result = await this.secColl.insertOne(nominations);
          return result;
        } catch(ex) {
          console.log(ex);
          throw(ex);
        }
      }    
}

module.exports = Nominations;