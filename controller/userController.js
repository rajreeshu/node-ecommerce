exports.home = (req,res)=>{
    res.render('home');
}

exports.productDetailes = (req,res)=>{
    res.render('productDetailes');
}

exports.productAdmin = (req,res)=>{
    res.render('productAdmin');
}

exports.imageUpload = (req,res)=>{
    res.render('imageUpload');
}
exports.login = (req,res)=>{
    res.render('login');
}
exports.signUp = (req,res)=>{
    res.render('signUp');
}
exports.productListed = (req,res)=>{
    res.render('productListed');
}
exports.favProducts = (req,res)=>{
    res.render('favProducts');
}