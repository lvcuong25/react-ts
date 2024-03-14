import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import { IProduct } from "../interface/IProduct";
import { ProductContext } from "../context/ProductContextProvider";

const Products = () => {
  const { products } = useContext(ProductContext);

  return (
   <div>

<section className="news">
            <div className="container">
                <div className="section-heading">
                    <h2 className="section-heading__title">New</h2>
                </div>
                <div className="section-body">
                    <div className="product-list">
                      {/* start product */}

                      {products.map((item: IProduct, index: number) => (
                        <div className="product-item" key={index}>
                            <div className="product-image">
                                <img
                                    src={item.image}
                                    className="product__thumbnail"
                                />
                                <span className="product-sale">30%</span>
                            </div>
                            <div className="product-info">
                                <h3 className="product__name">
                                    <a href="" className="product__link">{item.name}</a>
                                </h3>
                                <a href="" className="product__category">{item.description}</a>
                                <div className="product-price">
                                    <span className="product-price__new">{item.price}</span>
                                    <span className="product-price__old">$300</span>
                                </div>
                            </div>
                            <div className="product-actions">
                                <button className="btn product-action__quickview">Quick View</button>
                                <button className="btn product-action__addtocart">Add To Cart</button>
                                <div className="product-actions-more">
                                    <span className="product-action__share">Share</span>
                                    <span className="product-action__compare">Compare</span>
                                    <span className="product-action__like">Like</span>
                                </div>
                            </div>
                        </div>
                           ))}
                        {/* <!--End .product-item--> */}
                    
                     
                       
                    </div>
                </div>
            </div>
        </section>








   </div>
  );
};

export default Products;
