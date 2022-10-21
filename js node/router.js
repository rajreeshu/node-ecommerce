const router = require('express').Router();
const userController = require('./controller/userController');
const apiController = require('./controller/apiController');
//image upload functions
var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname + '/assets/productImg');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"_"+file.originalname);
    }
})
var fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true);
    } else {
        cb(null,false);
    }
}

var upload = multer({
    storage:storage,
    fileFilter:fileFilter
})

// image upload functions ends here.


router.get('/',userController.home);
router.get('/productDetailes',userController.productDetailes);
//admin page
router.get('/productAdmin',userController.productAdmin);
router.post('/api/product',upload.single('profileImg'),apiController.createProduct);
router.get('/imageUpload',userController.imageUpload);
router.post('/api/productImageUpload:productId',upload.single('image'),apiController.createProductImageUpload);
//admin page ends here.
router.get('/login',userController.login);
router.get('/signUp',userController.signUp);
router.get('/productListed',userController.productListed);
router.get('/favProducts',userController.favProducts);



//api routing

router.post('/api/allProduct',apiController.getProduct);
router.get('/api/product/:Productid/:email',apiController.getProductDetailes);
router.post('/api/signUp',apiController.signUp);
router.post('/api/login',apiController.login);
router.get('/api/productListed/:email',apiController.productListed);
router.patch('/api/fav/:email',apiController.fav);
router.get('/api/favProductList/:email',apiController.favProductList);





module.exports = router;