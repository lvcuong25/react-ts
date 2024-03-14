
import "../../style.scss"
 import logo from "../assets/logo.svg";
 import image1 from "../assets/icons/1.svg";
 import image2 from "../assets/icons/2.svg";
 import image3 from "../assets/icons/3.svg";
 import image4 from "../assets/icons/4.svg";

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
                                <a href="" className="main-menu__link">Home</a>
                            </li>
                            <li className="main-menu__item">
                                <a href="" className="main-menu__link">Shop</a>
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
                        <div className="header-item-user">
                            <span><img src={image1}/></span>
                        </div>
                        <div className="header-item-user">
                            <span><img src={image2} /></span>
                        </div>
                        <div className="header-item-user">
                            <span><img src={image3} /></span>
                        </div>
                        <div className="header-item-user">
                            <span><img src={image4} /></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header
