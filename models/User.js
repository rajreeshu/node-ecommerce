const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    name:{type:'string',required:true},
    email:{type:'string',required:true,unique:true},
    password:{type:'string',required:true},
    gender:{type:'string',required:true},
    fav:[{type:mongoose.Schema.ObjectId,ref:'Product'}]
   
},{timestamp:true});

module.exports = mongoose.model('user',user_schema);