


import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  aliasID: { type: String, default: uuidv4, unique: true, },
  alias: String,
  email: { type: String, unique: true, },
  hash: String,
  salt: String,
  date: { type: Date, default: Date.now }
});

UserSchema.methods.testFun =  function(){
  //console.log("SCHEMA Hello?")
  console.log(this)
}

UserSchema.methods.hashPassphrase = function(passphrase){
  //console.log("SCHEMA hashPassphrase")
  this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(passphrase, this.salt);
  //console.log(this)
}

UserSchema.methods.checkPassphrase = function(passphrase){
  //console.log("SCHEMA checkPassphrase")
  //console.log(this)
  return bcrypt.compareSync(passphrase, this.hash);
}

// Compile model from schema
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;