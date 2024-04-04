import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import React from 'react';
// import { IProduct } from '../../interface/IProduct';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCartMutation } from '../../hooks/useHookMutation';
import { ICart } from '../../interface/ICart';
import { IProduct } from '../../interface/IProduct';
import { toast } from 'sonner';
import { useCartQuery } from '../../hooks/useHookQuery';

const Detail = () => {
    const { mutate: addToCart, isPending: isAddpPending } = useCartMutation('CREATE', 'Add to cart successfully')
    const { mutate: updateCart, isPending: isUpdatePending } = useCartMutation('UPDATE', 'Update cart successfully')
    const [timer, setTimer] = useState(0)
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      return data;
    }
  });
  const { data: listCart, refetch } = useCartQuery(0)
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


  const [categoryName, setCategoryName] = useState('');
  useEffect(() => {
    const fetchCategoryName = async () => {
      // Thực hiện lấy tên danh mục dựa trên categoryID
      const response = await axios.get(`http://localhost:3000/category/${data.categoryID}`);
      setCategoryName(response.data.name);
    };

    if (data) {
      fetchCategoryName();
    }
  }, [data]);

  // Kiểm tra nếu dữ liệu đang được tải
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Kiểm tra nếu có lỗi khi tải dữ liệu
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
   <div>


<section className="main-action-bar">
    <div className="container">
        <div className="main-action-bar_inner">
            <div className="main-action-bar_inner_left">
                <div className="main-action-bar_inner_left_filter">
                    <Link to={`/`}><span>Home</span></Link>
                    <div>
                        <a href=""><img src="./img/arrownav.png" alt="" /></a>
                    </div>
                </div>
                <div className="main-action-bar_inner_left_filter">
                    <Link to={`/shop`}><span>Shop</span></Link>
                    <div>
                        <a href=""><img src="./img/arrownav.png" alt="" /></a>
                    </div>
                </div>
                <div className="main-action-bar_inner_left_showing">
                   <Link to={`/shop/${data.id}`}>{data.name}</Link>
                </div>
            </div>
        </div>
    </div>
</section>
{/* {data?.map((item:IProduct,index:number)=>( */}
  
<section className="product-detail">
    <div className="container">
        <div className="product-detail_inner">
            <div className="product-detail_media">
                <div className="product-detail_media_slide">
                    <div>
                        <img src="https://picsum.photos/id/5/200/100" alt="" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/id/1/200/100" alt="" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/id/2/200/100" alt="" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/id/3/200/100" alt="" />
                    </div>
                </div>
                <div className="product-detail_media_thumbnail">
                    <div className="product-detail_media_thumbnail__bg">
                        <img src={data.image} alt=""  width={300}/>
                    </div>
                </div>
            </div>
            <div className="product-detail_content">
    {/* Nội dung chi tiết sản phẩm */}
    <div className="detail_content">
        <h2>{data.name}</h2>
        <span>{data.price}</span>
        <div className="detail_content__star">
            <div className="star_fill">
                {/* <img src="./img/star.png" alt="">
                <img src="./img/star.png" alt="">
                <img src="./img/star.png" alt="">
                <img src="./img/star.png" alt="">
                <img src="./img/star_half.png" alt="">*/}
            </div> 
            
        </div>
        <p>
           {data.description}
        </p>
        {/* <div className="detail_content__size">
            <span>Size</span>
            <div className="detail_content__size__btn">
                <button>L</button>
                <button>XL</button>
                <button>XS</button>
            </div>
        </div> */}
        <div className="detail_content__color">
            <span>Color</span>
            <div className="detail_content__color__btn">
                <button className="violet"></button>
                <button className="black"></button>
                <button className="brown"></button>
            </div>
        </div>
        <div className="detail_content_action">
            <div className="detail_content_action__number">
                <span>-</span>
                <span>1</span>
                <span>+</span>
            </div>
            <div className="detail_content_action__addcart">
                <button onClick={() => handleAddToCart(data)} >  {isAddpPending ? "Adding" : isUpdatePending ? "Updating" : "Add To Cart"}</button>
                <button>+ Compare</button>
            </div>
        </div>
        <div className="handle"></div>
        <div className="detail_content_more">
            <div className="detail_content_more_box">
                <div className="name_more">
                    <span>SKU</span>
                </div>
                <span className="detail_content_more__dot">:</span>
                <span>SS001</span>
            </div>
            <div className="detail_content_more_box">
                <div className="name_more">
                    <span>Category</span>
                </div>
                <span className="detail_content_more__dot">:</span>
                <span>Sofas</span>
            </div>
            <div className="detail_content_more_box">
                <div className="name_more">
                    <span>Tags</span>
                </div>
                <span>{categoryName}</span>
            </div>
            
        </div>
    </div>
</div>



            </div>
        </div>
    
</section>


<section className="product-description">
    <div className="container">
        <div className="product-description_inner">
            <div className="product-description_title">
                <h2 className="active">Description</h2>
                <h2>Additional Information</h2>
                <h2>Reviews [5]</h2>
            </div>
            <div className="product-description_content">
            <p>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable
                        look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
                        <p>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of
                        the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts
                        a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to
                        fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish
                        travel.</p>
            </div>
            <div className="product-description_media">
                {/* Hình ảnh thêm */}
            </div>
        </div>
    </div>
</section>

   </div>
  );
};

export default Detail;
