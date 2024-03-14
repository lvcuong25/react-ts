import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
// import '../assets/style.css'
const WebsiteLayOut = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WebsiteLayOut;
