module.exports = router => {
    const path            = require('path');
    const fs              = require('fs');
    const multer          = require('multer');
    const imgurUploader   = require('imgur-uploader');
    const productDM       = require('../models/database-product.js');
    var _filename         = '';

    const multerCustom = {
        destination: function(req, file, cb) {
            cb(null, path.resolve(__dirname, "../public/upload/"));
        },
        filename: function(req, file, cb){
            var normalFileName = file.originalname.replace(" ", "") ;
            var uploadFileName = normalFileName + "_" + normalFileName.substr(normalFileName.indexOf('.'));

            _filename = "./server/public/upload/" + uploadFileName;

            return cb(false, uploadFileName);
        }
    }


    var storage   = multer.diskStorage(multerCustom)
    var upload    = multer({storage: storage}).single('imagevalue');
    
    router.get("/product-by-name/:name",     (req, res) => res.sendfile(path.resolve(__dirname, "../../", "build/index.html")));
    router.get("/all-product", (req, res) => {
        productDM.getProducsList((err, result) =>{
            return res.json(result)
        })
    })

    router.get("/get-product-by-name/:name", (req, res) => {
        const productName = req.params.name;
        productDM.getProductByName(productName, result => {
            res.send(result);
        })
    })


    router.get("/get-besell-products", (req, res) => {
        productDM.getProducsList((err, result) => {
            if(err) return res.send(err);

            for(var i = 0; i < result.length; i++) {
                for(var j = 0; j < result.length; j ++) {
                    if(result[i].sell > result[j].sell) {
                        var _single_result = result[i];
                        result[i] = result[j];
                        result[j] = _single_result;
                    }
                }
            }

            var _result = [];
            for(var i = 0; i < result.length; i ++) {
                if(i < 4 && result[i]) _result.push(result[i]);
            }

            res.json(_result);
        })
    })

    router.get("/get-related-products", (req, res) => {
        productDM.getProducsList((err, result) => {
            if(err) return res.send(err);

            for(var i = 0; i < result.length; i++){
                for(var j = 0; j < result.length; j++){
                    if(Date.parse(result[i].date) > Date.parse(result[j].date)){
                        var _single_result = result[i];
                        result[i] = result[j];
                        result[j] = _single_result;
                    }
                }
            }

            res.send(result);
        })
    })

    router.get('/get-sale-products', (req, res) => {
        productDM.getProducsList((err, result) => {
            if(err) return res.send(err);
            
            var _result = [];
            for(var i = 0; i < result.length; i++){
                if(result[i].status === 'new'){
                    _result.push(result[i]);
                    console.log("Get sale product: " + i);
                }
            }

            res.json(_result);
        })
    }) 

    router.get("/get-product/category/:category", (req, res) => {
        const category = req.params.category;
        console.log(category);
        productDM.getProductsByCategory(category, result => {
            if(result === "err") return res.send("Error !!");

            //console.log(result);
            res.send(result);
        })
    })


    router.post('/add-new-product', (req, res) => {
        if(!req.isAuthenticated()) return res.send(`Not login`);
        if(req.user.email !== 'systemofpeter@gmail.com') return res.send(`Not admin`);
        
        upload(req, res, err => {
            if(err) return res.send("error");

            setTimeout(() => {
                imgurUploader(fs.readFileSync(_filename), {title: 'product-image'}).then(data => {
                    fs.unlink(_filename);
                    console.log(`image link: ${data.link}`);
                    var productBundle     = req.body;
                    productBundle.date    = new Date().toLocaleString();
                    productBundle.name    = removeWordFromLastPosition(" ", productBundle.name);
                    productBundle.name    = removeWordFromLastPosition(".", productBundle.name);
                    productBundle.reviews = JSON.stringify([]);
                    productBundle.sell    = 0;
                    
                    productBundle.image = data.link;

                    // Bỏ ký tử '.' khỏi chuỗi nếu ở ký tự ở cuối chuỗi;                    
                    productDM.newProduct(req.body, result => {
                        if(result === "err")     return res.send("Have error when handling value in server"); 
                        if(result === "exists")  return res.send("Value is already exists in server ");;
                        
                        console.log(result)
                        console.log("Admin have just added new product: ")
                        console.log(req.body);
                        return res.redirect('/');
                    });
                })
            }, 2000);
        })
    })

    router.post("/plus-product-sell/:name", (req, res) => {
        const productName = req.params.name;
        console.log("Có người đang xem sản phẩm: " + productName);
        
        productDM.plusSell(productName, result => console.log("Plus sell of: " + productName + " result: " + result));
    })


    router.post('/update-product', (req, res) => {
        productDM.updateProduct(req.body.data, (result) => {
            return console.log(result);
        })
    })

    function removeWordFromLastPosition(word, text){
        var chA = text.split("");
        console.log(chA);
        if(chA[chA.length - 1] === word){
            delete chA[chA.length - 1];
        }

        return chA.join("");
    }
}