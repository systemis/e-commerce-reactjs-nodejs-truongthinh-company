import $      from 'jquery'
import axios  from 'axios';

class Product {
    updateProduct(bundle){
        console.log(bundle.reviews);
        $.ajax({
            url: '/update-product',
            type: 'POST',
            data: {data: bundle},
            success: data => {
                console.log(data);
            },
            error: err => {
                console.log(`Error when update product ${err}`);
            }
        })
    }

    getProductByName(name, fn){
        $.ajax({
            url: "/get-product-by-name/" + name,
            type: "get",
            success: data => {
                fn(data);
            },
            error: err => {
                console.log(err)
            }
        })
    }

    getNewProduct(fn){
        $.ajax({
            url: "/get-related-products", type: 'GET', 
            success: data => {
                if(data){
                    console.log(data);
                    fn(data);
                }       
            },
            error: err => {
                console.log(`Error when get new products: ${err}`); 
            }
        })
    }

    getBessellProducts(fn){
        $.ajax({
            url: '/get-besell-products',
            type: 'GET',
            success: data => {
                console.log(data);
                fn(data);
            },
            error: err => {
                console.log(`Error when get best sell products: ${err}`);
            }
        })
    }

    getSaleProducts(fn){
        $.ajax({
            url: '/get-sale-products',
            type: 'GET', 
            success: data => {
                fn(data);
            },
            error: err => {
                console.log(`Error when get sale product: ${err}`);
            }
        })
    }
}

module.exports = new Product();