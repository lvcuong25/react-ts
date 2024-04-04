import { Outlet } from "react-router-dom"
import HeaderAdmin from "../components/admin/HeaderAdmin"

// import '../assets/dashboard.css'
const DashboardAdmin = () => {
  return (
    <div>
    
  
    <HeaderAdmin/>
    <Outlet/>


    </div>
  )
}

export default DashboardAdmin
