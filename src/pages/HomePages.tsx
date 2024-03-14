import Banner from "../components/Banner";
import Blog from "../components/Blog";
import Products from "../components/Products";
import Service from "../components/Service";
import Shop from "../components/Shop";
// import Service from "../components/service";


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
