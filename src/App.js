import { Route, Routes, useNavigate } from "react-router";
import HomePage from "./Client/Homepage/HomePage";
import Premium from "../src/ServiceClient/Premium";
import Fast from "./ServiceClient/Fast";
import Dry from "./ServiceClient/Dry";
import Hotel from "./ServiceClient/Hotel";
import Discount from "./Client/Discount/Discount";
import About from "./Client/About/About";
import UserLogin from "./Client/Login/Login";
import UserRegister from "./Client/Register/Register";
import ManagerUsers from "./Admin/Users/ManagerUsers";
import Login from "./Admin/Login/Login";
import Register from "./Admin/Register/Register";
import ManagerProducts from "./Admin/Products/ManagerProducts";
import ManageOrder from "./Admin/Order/ManageOrder";
import ManageOrderDetail from "./Admin/Order/ManageOrderDetail";
import ManageContact from "./Admin/Contact/ManageContact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderClient from "./ServiceClient/OrderClient";
import BookingDemo from "./ServiceClient/BookingDemo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/premium" element={<Premium />} />
        <Route path="/fast" element={<Fast />} />
        <Route path="/dry" element={<Dry />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/bookingdemo" element={<BookingDemo />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/about" element={<About />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/home" element={<ManagerUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ManagerProducts />} />
        <Route path="/order" element={<ManageOrder />} />
        <Route path="/order_user/:id" element={<ManageOrderDetail />} />
        <Route path="/contact" element={<ManageContact />} />
        <Route path="/orderclient" element={<OrderClient />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
