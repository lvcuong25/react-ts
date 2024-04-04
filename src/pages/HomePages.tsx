import Banner from "../home/Banner";
import Blog from "../home/Blog";
import Service from "../home/Service";
import Shop from "../home/Shop";
import Products from "../home/product/Products";


const HomePages = () => {
  return (
    <div>
      <Banner />
      <Products />
      <Shop />
      <Blog/>
      <Service/>
    </div>
  );
};

export default HomePages;
