import { Route, Routes } from "react-router-dom";

import WebsiteLayOut from "./layout/WebsiteLayOut";
import HomePages from "./pages/HomePages";
import Articles from "./pages/Articles";
import ProductList from "./components/admin/product/ProductList";
import ProductAdd from "./components/admin/product/ProductAdd";
import ProductEdit from "./components/admin/product/ProductEdit";
import DashboardAdmin from "./layout/DashboardAdmin";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
// import isAdmin from "./components/auth/isAdmin";
import UserList from "./components/admin/users/UserList";
import CategoryList from "./components/admin/categoris/CategoryList";
import CategoryAdd from "./components/admin/categoris/CategoryAdd";
import CategoryEdit from "./components/admin/categoris/CategoryEdit";
import UserAdd from "./components/admin/users/UserAdd";
import UserEdit from "./components/admin/users/UserEdit";
import Shoping from "./home/Shop/Shoping";
import Detail from "./home/product/Detail";
import Cart from "./cart/Cart";
import { Toaster } from "sonner";
// import isAdmin from "./components/auth/isAdmin";
// import HomePages from './pages/HomePages'
// const AdminRoute = isAdmin(DashboardAdmin);
function App() {
  return (
    <>
    <Toaster richColors position='top-right' duration={2000} visibleToasts={3} expand={true} />
      <Routes>
        <Route path="/" element={<WebsiteLayOut />}>
          <Route index element={<HomePages />} />
          <Route path="articles" element={<Articles />} />
          <Route path="shop" element={<Shoping />} />
          <Route path="detail/:id" element={<Detail />} />

          <Route path="cart" element={<Cart />} />
          
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Route>

        <Route path="admin" element={<DashboardAdmin />}>
          {/* <Route index element={<ProductList />} /> */}
          <Route path="product">
            <Route index element={<ProductList />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path="edit/:id" element={<ProductEdit />} />
          </Route>

          <Route path="category">
            <Route path="edit/:id" element={<CategoryEdit />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route index element={<CategoryList />} />
          </Route>

          <Route path="user">
            <Route path="edit/:id" element={<UserEdit />} />
            <Route path="add" element={<UserAdd />} />
            <Route index element={<UserList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
