import React, { Component } from 'react';
import statusItem           from '../../Components/status-item.js';
import $ from 'jquery';

class ProductSimpleInfo extends Component {
    constructor(props) {
        super(props);
    }

    handlingPlusMinusAmount(){
        const sefl = this;
        var amount = (amount) => {
            var info = this.props.Data;
            info.amount += amount;
            info.total   = info.amount * info.price;

            console.log(info);
            this.props.update(info);
         
            $("#product-page-ammount").val(info.amount);
        }

        $(document).ready(() => {
            $("#numberic-plus").click(function() {
                amount(1);
            })
            
            $("#numberic-minus").click(function() {
                if(sefl.props.Data.amount > 1){
                    amount(-1);
                }
            })
        })
    }
    
    componentWillMount() {
        this.handlingPlusMinusAmount();
    }
    
    render() {
        return (
            <div className="product-view-page-simple-product-info-group">
                <div className="row">
                    <div className="show-product-images col-md-2">
                        
                    </div>
                    <div className="show-selected-product-image col-md-5 col-sm-6">
                        <div className="child">
                            <img src={this.props.Data.image} alt="Image about product"/>
                            {statusItem(this.props.Data.status)}
                        </div>
                    </div>
                    <div className="show-simple-product-info col-md-5 col-sm-6">
                        <div className="show-product-name">
                            <h1>{this.props.Data.name}</h1>
                        </div>
                        <div className="show-product-category">
                            <a href={"/product/category/"+ this.props.Data.category}>
                                <p>{this.props.Data.category}</p>
                            </a>
                        </div>
                        <div className="show-product-ranting">
                        </div>
                        <div className="show-product-des">
                            <p>{this.props.Data.des}</p>
                        </div>
                        <div className="show-product-price">
                            <p>{this.props.Data.price}</p>
                        </div>
                        <div className="show-amount-addtocard row">
                            <div className="show-ammount">
                                <button className="btn btn-numberic" id="numberic-plus">+</button>
                                <input type="number" id="product-page-ammount" value="1" />
                                <button className="btn btn-numberic" id="numberic-minus">-</button>
                            </div>
                            <button 
                                className="btn btn-addtocard"
                                onClick={() => this.props.addListener()}
                                >
                                add to card 
                            </button>
                        </div>
                        <div className="show-product-info-value">
                            <p>
                                PRODUCT ID: 
                                <strong className="show-b-simple-product-id">
                                    {this.props.Data.id}
                                </strong>
                            </p>
                            <p>
                                CATEGORY:
                                <strong className="show-b-simple-product-category">
                                    {this.props.Data.category}
                                </strong>
                            </p>
                            
                        </div>
                        <div className="show-share-group">
                            <p>Share this item: </p>
                            <ul>
                                <li className="face"> <a href="Facebook"> Facebook </a> </li>
                                <li className="twitter"> <a href="Twitter"> Twitter </a> </li>
                                <li className="google"> <a href="Google+"> Google+ </a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductSimpleInfo;
