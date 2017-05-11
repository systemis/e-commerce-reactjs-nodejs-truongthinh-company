import React, { Component } from 'react';

import ProductCard from '../../Components/ProductCard/product-card.js';

var ExampleProdcuct1 = require('../../public/best-seller-image/ex-1.jpg');
var ExampleProdcuct2 = require('../../public/best-seller-image/ex-2.jpg');
var ExampleProdcuct3 = require('../../public/best-seller-image/ex-3.jpg');
var ExampleProdcuct4 = require('../../public/best-seller-image/ex-4.jpg');

class BestSellerGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingProductsData: [
              {
                    imagefilename: ExampleProdcuct1,
                    name:  "Paul Smith",
                    category: "Handsome",
                    price: "14.00"
                },
                {
                    imagefilename: ExampleProdcuct2,
                    name:  "Paul Smith",
                    category: "Handsome",
                    price: "14.00"
                },
                {
                    imagefilename: ExampleProdcuct3,
                    name:  "Paul Smith",
                    category: "Handsome",
                    price: "14.00"
                },
                {
                    imagefilename: ExampleProdcuct4,
                    name:  "Paul Smith",
                    category: "Handsome",
                    price: "14.00"
                },
            ]
        }
    }

    render() {
        return (
            <div className="home-page-best-seller-group container">
                <div className="header-group-type-o">
                    <h1 className="title"> Bestseller </h1>
                    <h3 className="des"> MOST SOLD ITEMS IN THE MARKET</h3>
                    <div className="ngan"></div>
                </div>
                <div className="show-best-sellers-product row">
                    {this.state.trendingProductsData.map((value, index) => {
                       return <ProductCard key={index} Data={value} />
                    })}
                </div>
            </div>
        );
    }
}

export default BestSellerGroup;