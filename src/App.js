import { Routes, Route } from "react-router-dom"
import HomeWebsitePage from "./pages/HomeWebsitePage";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";

import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/Auth/Login";

import AdminLogin from "./pages/Auth/AdminLogin";



import SellerRegister from "./pages/Auth/SellerReg";
import SellerLogin from "./pages/Auth/SellerLogin";
import SellerHome from "./pages/Seller/sellerNav";
import SellerAddProduct from "./pages/Seller/sellerAddProDashboard";
import SellerList from "./pages/Admin/SellerList";


import UserList from "./pages/Admin/UserList";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllProduct from "./pages/Admin/AllProduct";

import Products from "./pages/Products/Products.js";

import UserDashboard from "./pages/User/UserDashboard.js"
import Home from "./pages/Home";
import Cart from '../src/pages/carts'

import Category from "./pages/Category";
import SellerDisplayProduct from "./pages/Seller/SellerDisplayProduct";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import SellerRoute from "./components/Routes/SellerRoute";




function App() {
  return (
    <>

      <Routes>

        {/* USER  PROTECTED */}
        <Route path="/userDashboard" element={<PrivateRoute />}>
          <Route path="" element={<UserDashboard />} />
        </Route>

        {/* USER LOGIN and REGISTER */}
        <Route path="/loginUser" element={<Login />} />
        <Route path="/registerUser" element={<Register />} />

        {/* ADMIN PROTECTED*/}
        <Route path="/adminDashboard" element={<AdminRoute />}>
          <Route path="" element={<AdminDashboard />} />
        </Route>


        <Route path="/sellerList" element={<SellerList />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/userDashboardlist" element={<UserList />} />




        <Route path="/seller" element={<SellerRegister />} />
        <Route path="/sellerLogin" element={<SellerLogin />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Seller Dashboard */}
        <Route path="/sellerDisplayProduct" element={< SellerRoute />}>
          <Route path="" element={< SellerDisplayProduct />} />
        </Route>
        {/* <Route path="/sellerDisplayProduct" element={<SellerDisplayProduct />} /> */}


        <Route path="/sellerDisplayProduct" element={< SellerAddProduct />} />
        <Route path="/sellerAddProDashboard" element={<SellerAddProduct />} />
        <Route path="/sellerHome" element={<SellerHome />} />


        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="/productDetails/:slug" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/category" element={<Category />} />

        <Route path="/HomeWebSitePage" element={<HomeWebsitePage />} />

      </Routes >

    </>
  );
}

export default App;
