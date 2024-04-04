
import "../../style.scss"
 import logo from "../assets/logo.svg";
 import image1 from "../assets/icons/1.svg";
 import image2 from "../assets/icons/2.svg";
 import image3 from "../assets/icons/3.svg";
 import image4 from "../assets/icons/4.svg";
// import Logout from "../components/auth/LogOut";
// import LogoutButton from "../components/auth/LogOut";
import { Link } from "react-router-dom";
// import LogoutButton from "../components/auth/LogOut";

const Header = () => {
  return (
    <div>
      <header className="header">
            <div className="container">
                <div className="header-inner">
                    <a href="" className="header__logo">
                        <img src={logo} alt="" />
                        
                    </a>
                    <div className="button-mobile"><button>=</button></div>
                    <nav className="main-menu">
                        <ul className="main-menu__list">
                            <li className="main-menu__item">
                                <Link to={`/`} className="main-menu__link">Home</Link>
                            </li>
                            <li className="main-menu__item">
                                <Link to={`shop`} className="main-menu__link">Shop</Link>
                            </li>
                            <li className="main-menu__item">
                                <a href="" className="main-menu__link">About</a>
                            </li>
                            <li className="main-menu__item">
                                <a href="" className="main-menu__link">Contact</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-items">
                        {/* <LogoutButton/> */}
                        <div className="header-item-user">
                           <Link to={`/signin`}> <span><img src={image1}/></span></Link>
                        </div>
                        <div className="header-item-user">
                            <span><img src={image2} /></span>
                        </div>
                        <div className="header-item-user">
                            <span><img src={image3} /></span>
                        </div>
                        <div className="header-item-user">
                            <Link to={`/cart`}><span><img src={image4} /></span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header
