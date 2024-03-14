import { Outlet } from "react-router-dom"
import HeaderAdmin from "../components/HeaderAdmin"
import FooterAdmin from "../components/FooterAdmin"
// import '../assets/dashboard.css'
const DashboardAdmin = () => {
  return (
    <div>
    
  
    <HeaderAdmin/>
    <Outlet/>
    <FooterAdmin/>

    </div>
  )
}

export default DashboardAdmin
