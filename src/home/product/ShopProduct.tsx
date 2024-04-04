import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../../interface/IProduct";
import { Link } from "react-router-dom";
import { useCartMutation } from "../../hooks/useHookMutation";
import { useState } from "react";
import { toast } from "sonner";
import { ICart } from "../../interface/ICart";
import { useCartQuery } from "../../hooks/useHookQuery";

const ShopProduct = () => {
    const { data: listCart, refetch } = useCartQuery(0)

    const { data } = useQuery({
        queryKey: ["PRODUCT"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/products`)
            return data
        }
    })

    const { mutate: addToCart, isPending: isAddpPending } = useCartMutation('CREATE', 'Add to cart successfully')
    const { mutate: updateCart, isPending: isUpdatePending } = useCartMutation('UPDATE', 'Update cart successfully')
    const [timer, setTimer] = useState(0)

    const handleAddToCart = (product: IProduct) => {
        if (timer > 0) {
            toast.error('Too fast, try again latter')
            console.log(timer);
        }
        else {
            setTimer(1)
            const cart = listCart.find((item: ICart) => item.product === product.id)
            if (cart) {
                updateCart({ ...cart, quantity: cart.quantity + 1 })
                setTimer(1)
            } else {
                addToCart({ product: product.id!, quantity: 1 })
            }
            refetch()
            refetch()
            setTimeout(() => {
                setTimer(0)
            }, 3000)
        }
    }

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
                            {data?.map((item: IProduct, index: number) => (
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
                                        <div className="product-price">
                                            <span className="product-price__new">{item.price}</span>
                                            <span className="product-price__old">$300</span>
                                        </div>
                                    </div>
                                    <div className="product-actions">
                                        <Link to={`/detail/${item.id}`}>
                                            <button className="btn product-action__quickview">
                                                Quick View
                                            </button>
                                        </Link>
                                        <button onClick={() => handleAddToCart(item)} className="btn product-action__addtocart">{isAddpPending ? "Adding" : isUpdatePending ? "Updating" : "Add To Cart"}</button>
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

export default ShopProduct;
