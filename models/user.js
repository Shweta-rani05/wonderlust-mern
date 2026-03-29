const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

 // ✅ FIX for Node v24
const plugin = passportLocalMongoose.default || passportLocalMongoose;

const userSchema = new Schema({
    email: {
        type:String,
        required : true
    }

}); //pbkdf2 hashing algorithm implemented in the project 

userSchema.plugin(plugin);//username, hashing,salting implement automatically
module.exports = mongoose.model("User",userSchema);
