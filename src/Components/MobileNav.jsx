import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from '../context/shop-context';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CottageIcon from '@mui/icons-material/Cottage';
import Divider from '@mui/material/Divider';
import Account from "./Account";

export default function MobileNav({ isMenuOpen, toggleMobileMenu }) {

  const { setLoginModal, user } = useContext(ShopContext);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);


  function handleCategoriesClick() {
    setIsCategoriesOpen(!isCategoriesOpen)
   }

  return (
    <div className={`w-screen gap-2 h-full min-h-screen z-50 p-8 fixed overflow-y-auto transition-all duration-200 left-0 top-0 bg-white ${isMenuOpen ? " opacity-100" : "left-full opacity-0"}`}>
      <div className="flex justify-between items-center mb-4">
        {/*Header of hamburger popout */}
        <img src="./logo-2.png" className="w-10 h-10" />
        <img onClick={toggleMobileMenu} className="w-8 h-8 cursor-pointer" src="/close.png" />

      </div>
      <Link to="/">
          <div onClick={toggleMobileMenu} className="flex my-2 text-md gap-3 flex-row bg-white p-4 shadow border-gray-400  ">
            <CottageIcon/>
            Home
          </div>
      </Link>
      <Link to="/store" onClick={toggleMobileMenu} className="flex my-2 text-md gap-3 flex-row bg-white p-4 shadow border-gray-400">
          <SpaceDashboardIcon className='rotate-90' />
          <span >
             All stores
          </span>
      </Link>
      <div onClick={handleCategoriesClick} className={`flex items-center justify-between py-2 px-4 border-b-2 bg-white border-pink-300 shadow cursor-pointer`}>
      <SpaceDashboardIcon />
        <span className=" text-md text-black font-sans mx-2" >Categories</span>
        <img className={`w-14 h-14 transition duration-200 ${isCategoriesOpen ? "rotate-180" : ""}`} src="/arrow_down.png" alt="Arrow" />
      </div>

      

      <div className={`categories ${isCategoriesOpen ? "" : "open"} header-bottom-bar flex flex-col gap-4 border-b border-teal-500 py-2 px-4 -z-10`}>
        {/* Need to subscribe to flaticon for the rights to use these. Or swap to font awesome. */}
        <Link to="/vegetables">
          <div onClick={toggleMobileMenu} className="vegetables category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="carrot.png" />
            Vegetables
          </div>
        </Link>
        <Link to="/fruits">
          <div onClick={toggleMobileMenu} className="fruits category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="pear.png" />
            Fruits
          </div>
        </Link>
        <Link to="/dairy">
          <div onClick={toggleMobileMenu} className="dairy category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="milk.png" />
            Dairy
          </div>
        </Link>
        <Link to="/meats">
          <div onClick={toggleMobileMenu} className="meat category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="meat2.png" />
            Meats
          </div>
        </Link>
        <Link to="/bread">
          <div onClick={toggleMobileMenu} className="bread category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="bakery2.png" />
            Bakery
          </div>
        </Link>
        <Link to="/frozen-foods">
          <div onClick={toggleMobileMenu} className="frozen-foods category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="frozen-fish.png" />
            Frozen Foods
          </div>
        </Link>
        <Link to="/beverages">
          <div onClick={toggleMobileMenu} className="beverages category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="/beverages.png" />
            Beverages
          </div>
        </Link>
        <Link to="/cleaning-supplies">
          <div onClick={toggleMobileMenu} className="cleaning-supplies category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="cleaning-products2.png" />
            Cleaning Supplies
          </div>
        </Link>
        <Link to="/personal-care">
          <div onClick={toggleMobileMenu} className="personal-care category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="facial-mask.png" />
            Personal Care
          </div>
        </Link>
        <Link to="/baby-care">
          <div onClick={toggleMobileMenu} className="baby-care category-container flex items-center gap-3 p-2 hover:bg-black/10 hover:rounded">
            <img className="category-img w-12 h-12" src="baby.png" />
            Baby Care
          </div>
        </Link>
      </div>
      <Divider style={{ marginTop: "40px", marginBottom: "5px" }} variant="middle" />
      {user ?
        <div className="flex gap-2 cursor-pointer w-full rounded hover:bg-[#f5f5f5] p-2" onClick={toggleMobileMenu}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 512 512"><path fill="currentColor" d="M160 256a16 16 0 0 1 16-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h160a56.06 56.06 0 0 0 56-56V272H176a16 16 0 0 1-16-16Zm299.31-11.31l-80-80a16 16 0 0 0-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62Z" /></svg>
          </span>
            <p className="log-out-text self-center">Logout</p>
        </div>
        :
        <button className="transition-all duration-700" to="" onClick={
          () => {
            setLoginModal(1)
            toggleMobileMenu(false)
          }
        }>
          <div className="header-account w-14 h-14 mt-4 flex items-center gap-3">
            {/* <img className="account-icon-img" src="/account-icon.png" />
            <p className="sign-in-text">Sign&nbsp;In</p> */}
            <Account visible={true} />
          </div>
        </button>
      }
    </div>
  );
}
