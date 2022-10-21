const mongoose = require('mongoose');
const product=require("../models/product");
const user = require("../models/user");

exports.favProductList = async (req,res)=>{
    try{
        let productList = await user.findOne({"email":req.params.email}).populate('fav');
        res.json(productList.fav);
    }catch(err){
        res.send(err);
    }
}


exports.fav = async(req,res)=>{
    
        try{
            let productUser = await user.findOne({"email":req.params.email});
            let isExist = false;
            productUser.fav.forEach((e)=>{
                if(e==req.body.productId){
                    isExist=true;   
                }
            });
            if(isExist){
                
                let response = await user.findOneAndUpdate({"email":req.params.email},{$pull:{fav:req.body.productId}},{new:true});
                res.json(response);
            }else{
                console.log("fal")
                let responses = await user.findOneAndUpdate({email:productUser.email},{$push:{fav:req.body.productId}},{new:true});
                res.status(201).json(responses);
            }
          
            
           
        }catch(err){
            console.log(err)
            res.send(err);
        }
    
       
    
        
    
    }

exports.productListed = async(req,res)=>{

console.log(req.params.email);
    try{
        var response2 = await user.findOne({"email":req.params.email});
        
       
    }catch(err){
        res.send(err);
    }

     console.log(response2);

    try{
       
        var response3 = await product.find({"owner":response2._id});
        res.json(response3);

    }catch(err){
        res.send(err);
    }
    

}
exports.createProduct = async(req,res)=>{
 
    let owner;

    try{
        let response2 = await user.findOne({"email":req.body.owner});
        owner = response2._id;
       
    }catch(err){
        res.send(err);
    }

    //console.log(response2);
    
    let product_data = {
        "name":req.body.name,
        "price":req.body.price,
        "description":req.body.description,
        "owner":owner,
        "gender":req.body.gender,
        "category":req.body.category,
        "profileImg":'assets/productImg/' + req.file.filename
    }
    try{
        let response = await product.create(product_data);
        res.json(response._id);
    }catch(err){
        res.send(err);
    }
}

exports.createProductImageUpload = async(req,res)=>{
    
}

exports.getProduct = async(req,res)=>{

    console.log(req.body);
    
    try{
        let response;

        let searchObj={};
        if(req.body.searchText!="" && req.body.searchText!=undefined){
            searchObj.name={ $regex: '.*' + req.body.searchText + '.*' };
        }
        if(req.body.searchGenders!="" && req.body.searchGenders!=undefined){
            searchObj.gender=req.body.searchGenders;
        }
        if(req.body.searchNormalWear!="" && req.body.searchNormalWear!=undefined){
            searchObj.category=req.body.searchNormalWear;
        }
        if(req.body.searchWinterWear!=""&& req.body.searchWinterWear!=undefined){
            searchObj.category=req.body.searchWinterWear;
        }
        if(req.body.searchShoes!=""&& req.body.searchShoes!=undefined){
            searchObj.category=req.body.searchShoes;
        }

        console.log(searchObj);

        response = await product.find(searchObj);
        
        res.json(response);

    }catch(err){
        res.send(err);
    }
}

exports.getProductDetailes = async(req,res)=>{

    let id = req.params.Productid;
    let email = req.params.email;
    try{
        let response = await product.findById(id).populate('owner');
        //console.log(response);
        let userInfo = await user.findOne({"email":email});
        let isExist = false;
        userInfo.fav.forEach(function(e){
            if(e==id){
                isExist=true;
            }
        })
       // response.push({"isfav":isExist});
       
        res.json({
            name:response.name,
            price:response.price,
            description:response.description,
            owner:response.owner.name,
            gender:response.gender,
            category:response.category,
            img:response.profileImg,
            isfav:isExist
        });
        
    }catch(err){
        res.send(err);
    }
}

exports.signUp = (req,res)=>{
   
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let gender = req.body.gender;
    
    if(name==""||email==""||password==""||gender==""){
        res.json("fill all the fields");
    }

    let signUp_data={
        "name":name,
        "email":email,
        "password":password,
        "gender":gender
    }

    user.findOne({email:req.body.email}).then((existingUser)=>{

        if(!existingUser){
            user.create(signUp_data).then(()=>{
                res.json({"response":"success"});
            }).catch((err)=>{
                res.send("something went wrong in registration");
            });
        }else{
            res.json({"response":"user already exist"});
        }
    }).catch((err)=>{
        res.send("something went wrong");
    });
   
}


exports.login = async(req,res)=>{
   
    let email = req.body.email;
    let password = req.body.password;

    if(email==""||password==""){
        res.json("fill all the fields");
    }


    let login_data={
        "email":email,
        "password":password,
    }
    try{
        let response = await user.find(login_data);
      // res.json(response);
        if(response!=""){
            res.json({"response":"1"})
        }else{
            res.json({"response":"0"})
        }
    }
    catch(err){
        res.send(err);
    }
}
 