const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    name:{type:'string',required:true},
    price:{type:'number',required:true},
    description:{type:'string',required:true},
    gender:{type:'string'},
    category:{type:'string'},
    owner:{type:'objectId', ref:'user',required:true},
    profileImg:{type:'string'}
   
},{timestamp:true});

module.exports = mongoose.model('Product',product_schema);