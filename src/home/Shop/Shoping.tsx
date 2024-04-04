
import image14 from "../../assets/icons/14.svg";
import image15 from  "../../assets/icons/15.svg";
import image16 from  "../../assets/icons/16.svg";
import Service from "../Service";

import ShopProduct from "../product/ShopProduct";

const Shoping = () => {
  return (
    <div>
      <section className="banner">
  {/* <img src="https://picsum.photos/id/10/1440/500" alt="" className="banner__img" /> */}
  <div className="banner-item">
    <div className="container">
      <div className="banner-nav">
        <div className="banner-item-menu">
          <div className="banner-item-menu-icon">
            <span><img src={image14} alt="" />Filter</span>
            <span><img src={image15} alt="" /></span>
            <span><img src={image16} alt="" /></span>
            <span className="showing">Showing 1–16 of 32 results</span>
          </div>
        </div>
        <div className="banner-item-form">
          <div className="form-menu">
            <label htmlFor="">Show</label>
            <input type="text" className="show-input" placeholder="16" />
          </div>
          <div className="form-menu">
            <label htmlFor="">Short by</label>
            <input type="text" className="shortby-input" placeholder="Default" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <ShopProduct/>
    <Service/>
    </div>
  )
}

export default Shoping
