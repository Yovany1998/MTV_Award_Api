var conexion = require('../../../utility/dao');
const bcrypt = require("bcryptjs");
var ObjectID = require('mongodb').ObjectId;
var _db;

class Users{
    secColl = null;
    constructor() {
        this.initModel();
    }

    async initModel(){
        try {
            _db = await conexion.getDB();
            this.secColl = await _db.collection("user");
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    async createNewUser( email, password) {
        try {
          let user = {
            email: email,
            password: await bcrypt.hash(password, 10),
            lastlogin: null,
            lastpasswordchange: null,
            passwordexpires: new Date().getTime() + (90 * 24 * 60 * 60 * 1000), 
            oldpasswords: [],
            roles:["public"],
            horaDeVotacion: null,
            horaDeDisponibilidad: null
          }
          let result = await this.secColl.insertOne(user);
          //console.log(result);
          return result;
        } catch(ex) {
          console.log(ex);
          throw(ex);
        }
      }
    
      async getByEmail(email){
        const filter = {"email": email};
        return await this.secColl.findOne(filter);
      }
    
      async comparePassword (rawPassword, dbPassword){
        return await bcrypt.compare(rawPassword, dbPassword);
      }
}

module.exports = Users;