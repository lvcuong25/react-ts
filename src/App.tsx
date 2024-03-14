import { Route, Routes } from "react-router-dom";

import WebsiteLayOut from "./layout/WebsiteLayOut";
import HomePages from "./pages/HomePages";
import Articles from "./pages/Articles";
import ProductList from "./components/admin/ProductList";
import ProductAdd from "./components/admin/ProductAdd";
import ProductEdit from "./components/admin/ProductEdit";
import DashboardAdmin from "./layout/DashboardAdmin";
// import HomePages from './pages/HomePages'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WebsiteLayOut />}>
          <Route index element={<HomePages />} />
          <Route path="articles" element={<Articles />} />
        </Route>

        <Route path="admin" element={<DashboardAdmin />}>
          <Route index element={<ProductList />} />
          <Route path="product/add" element={<ProductAdd />} />
          <Route path="product/edit/:id" element={<ProductEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
