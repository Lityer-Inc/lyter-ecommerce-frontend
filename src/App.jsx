import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "./Components/Navbar";
// import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Beverages from "./Pages/Beverages";
import Bakery from "./Pages/Bakery";
import Vegetables from "./Pages/Vegetables";
import Dairy from "./Pages/Dairy";
import Meats from "./Pages/Meats";
import FrozenFoods from "./Pages/FrozenFoods";
import CleaningSupplies from "./Pages/CleaningSupplies";
import PersonalCare from "./Pages/PersonalCare";
import BabyCare from "./Pages/BabyCare";
import Fruits from "./Pages/Fruits";
import "./index.css";
import { ShopContext } from "./context/shop-context";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import StoresList from "./Pages/StoresList";
import StoreFront from "./Pages/StoreFront";
import Preloader from "./Components/Preloader";
import Protectedroute from "./Components/Protectedroute";
// import Account from "./Pages/Dashbardlayout";
import Orders from "./Pages/Orders";
import Alert from "./Components/Alert";
import Saved from "./Pages/Saved";
import Dashboardhome from "./Pages/Dashboardhome";
import CheckoutPayment from "./Pages/CheckoutPayment";
import ProductDetails from "./Components/ProductDetails";
import Cookies from "js-cookie";
import apiService from "./utils/apiService.jsx";

export default function App() {
  const {
    loginModal,
    setLoginModal,
    alertState,
    alert,
    setAlert,
    setAlertState,
    setUserDetails,
    stores,
    setStores
  } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState(null);
  const modal = useRef(null);
  const token = Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      console.log("listening 1");
      if (loginModal !== 0 && !modal.current.contains(event.target)) {
        console.log("listening 2");
        setLoginModal(0);
      }
    };

    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the delay
    }, 3000);

    setTimeout(() => {
      setAlertState();
      setAlert(false); // Set isLoading to false after the delay
    }, 3000);

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modal, loginModal, isLoading, alert, token]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await apiService.decodeJwt();
      if (response.status !== 200) {
        setIsErr(response.data);
        return;
      } else {
        setUserDetails({
          email: await response.data.email,
          name: await response.data.email.split("@")[0]
        });  
      }
    };

    const getStores = async () => {
      const response = await apiService.getStores();
      console.log("respnse : ", response);
      if (response) {
        setStores(response);
      } else {
        alert("somehting wrong !!!");
      }
    };
    getUserData();
    getStores();
  }, []);

  if (isErr != null) {
    return alert('Error : ' + isErr);
  }

  return (
    <div className="bg-[#fff] w-100 h-100 relative">
      {isLoading && <Preloader />}

      {alert && <Alert info={alertState} />}

      <Navbar />
      <ProductDetails />
      <Routes>
        <Route path="/" element={<StoresList />} />
        <Route path="/store" element={<StoresList />} />
        <Route path="/storefront" element={<StoreFront />} />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/bread" element={<Bakery />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/dairy" element={<Dairy />} />
        <Route path="/meats" element={<Meats />} />
        <Route path="/frozen-foods" element={<FrozenFoods />} />
        <Route path="/cleaning-supplies" element={<CleaningSupplies />} />
        <Route path="/personal-care" element={<PersonalCare />} />
        <Route path="/baby-care" element={<BabyCare />} />
        <Route path="/checkout-payment" element={<CheckoutPayment />} />
        <Route
          path="/dashboard"
          element={
            <Protectedroute>
              <Dashboardhome />
            </Protectedroute>
          }
        />
        <Route
          path="/orders"
          element={
            <Protectedroute>
              {" "}
              <Orders />{" "}
            </Protectedroute>
          }
        />
        <Route
          path="/saved"
          element={
            <Protectedroute>
              {" "}
              <Saved />{" "}
            </Protectedroute>
          }
        />
      </Routes>
      {loginModal !== 0 && (
        <div
          className="login-box fixed p-10 box-border top-[50%] z-30 left-[50%] w-[80%] md:w-[700px] my-auto mx-auto translate-x-[-50%] translate-y-[-50%] rounded-[10px]"
          style={{
            background: "rgba(255,255,255)",
            boxShadow: "0 15px 25px rgba(0,0,0,.6)"
          }}
          ref={modal}
        >
          <div className="flex justify-center items-center mb-5">
            <div className="w-24">
              <img className="header-logo-img w-24" src="/logo.png" />
            </div>
          </div>

          <div className="flex justify-center items-center gap-[10px] py-6">
            <div
              className={`${
                loginModal === 1
                  ? "text-black font-bold text-lg"
                  : "cursor-pointer z-[9999999]"
              }`}
              onClick={() => setLoginModal(1)}
            >
              Login
            </div>
            <div
              className={`${
                loginModal === 2
                  ? "text-black font-bold text-lg"
                  : "cursor-pointer z-[9999999]"
              }`}
              onClick={() => setLoginModal(2)}
            >
              SignUp
            </div>
          </div>

          {loginModal === 1 ? <Login /> : <Signup />}
        </div>
      )}
    </div>
  );
}
