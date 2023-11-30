import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { CSSTransition } from "react-transition-group";
import Account from "./Account";
import Cart from "./Cart";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { ShopContext } from "../context/shop-context";
import { useContext } from "react";
import { CheckoutPage } from "./Checkout";
import SearchIcon from '@mui/icons-material/Search';



export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  // If it is on a cell phone, we cancel the overflow of the main page
  function handleHamburgerClick() {
    setIsMenuOpen(!isMenuOpen)
    isMenuOpen ? document.body.style.overflow = "initial" : document.body.style.overflow = "hidden";
  }

  function handleCategoriesClick() {
    setIsCategoriesOpen(!isCategoriesOpen)
  }

  function handleCartShopClick() {
    setIsCartOpen(!isCartOpen)
  }


  const menu = [
    { name: 'Vegetables', Icon: 'carrot.png', linkTo: '/vegetables' },
    { name: 'Fruits', Icon: 'pear.png', linkTo: '/fruits' },
    { name: 'Dairy', Icon: 'milk.png', linkTo: '/dairy' },
    { name: 'Meats', Icon: 'meat2.png', linkTo: '/meats' },
    { name: 'Bakery', Icon: 'bakery2.png', linkTo: '/bread' },
    { name: 'Frozen Foods', Icon: 'frozen-fish.png', linkTo: '/frozen-foods' },
    { name: 'Beverages', Icon: 'beverages.png', linkTo: '/beverages' },
    { name: 'Cleaning Supplies', Icon: 'cleaning-products2.png', linkTo: '/cleaning-supplies' },
    { name: 'Personal Care', Icon: 'facial-mask.png', linkTo: '/personal-care' },
    { name: 'Baby Care', Icon: 'baby.png', linkTo: '/baby-care' },
  ]






  useEffect(() => {
    // Function to update the screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    console.log(screenWidth, "checkers");
    // Attach the handleResize function to the window resize event
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty dependency array ensures the effect runs only once on mount



  return (
    <>
      {/*Main container - navbar*/}
      <div className={`sticky top-0 z-20 transition-all duration-500 ${isCategoriesOpen ? "" : "md:mb-12"}`}>
        <div className="p-3 pb-1 w-full sticky top-0 z-20 bg-[#F5F5F5] shadow">
          <div className="flex w-full justify-evenly md:justify-between items-center ">

            {/* menu - logo container */}
            <div className="left-side flex justify-between gap-5 w-[70%] items-center">
              {/* menu */}
              <Link to="/" className="w-12 hidden md:flex ml-1">
                <div className="header-logo w-64">
                  <img className="header-logo-img w-12 pb-1" src="logo-2.png" />
                </div>
              </Link>

              <div onClick={handleHamburgerClick} className={`block cursor-pointer md:hidden`}>
                <img className="w-8 h-8 mr-5 mb-1" src="/menu.png" />
              </div>
              <MobileNav isMenuOpen={isMenuOpen} toggleMobileMenu={handleHamburgerClick} />

            <Link to="/store" className="hidden md:flex items-center justify-evenly px-4 py-2 w-[300px] hover:bg-[#fcbd3f] duration-500 transition-all rounded-lg cursor-pointer">
              <SpaceDashboardIcon className='rotate-90'/>
              <span className="text-md text-black font-bold font-sans">
                All stores
              </span>
            </Link>

            {/* search-bar categories*/}
              <div onClick={handleCategoriesClick} className={`hidden md:flex items-center justify-center px-4 py-2 hover:bg-pink-300 duration-500 transition-all rounded-lg cursor-pointer`}>
                <SpaceDashboardIcon />
                <span className=" text-md text-black font-bold font-sans mx-2" >Categories</span>
              </div>
              <div className="w-full pl-8 relative header-searchbar rounded-lg flex items-center hover:border-black/50 bg-white p-2">
                <SearchIcon className="absolute left-3 cursor-pointer"/>
                <input
                  className="header-searchbar-input w-full text-gray-700 mr-3 px-2 focus:outline-none"
                  type="text"
                  placeholder="Search Products"
                />
              </div>
            </div>


            <div>
              <div className="flex items-center gap-6">
                {/* Account */}
                <Account />
                {/* Cart */}
                {screenWidth <= 766 ? (
                  <Cart />
                ) : (
                  <div onClick={handleCartShopClick}>
                    <Cart />
                  </div>
                )}
                  <CheckoutPage isCartOpen2={isCartOpen} toggleMobileCart={handleCartShopClick} />
              </div>
            </div>
          </div>



          {/* <div className="header-coupon">
  <h3 className="">Today's Coupon:</h3>
  <h4 className="coupon-text">Apple20 (20% off apples)</h4>
</div> */}

          {/* <div className="header-account">
<img className="account-icon-img" src="/account-icon.png" />
<p className="sign-in-text">Sign In</p>
</div> */}
        </div>
        <div className="fixed w-full z-10">
          {/* menu lg */}
          <div className={`md:flex justify-evenly text-white px-2 pt-[8px] pb-[4px] shadow transition-all duration-500 bg-[#F5F5F5] w-full relative z-10 items-center hidden ${isCategoriesOpen ? "top-[-200px] opacity-0" : "top-0 opacity-100"} `}>
            {menu.map((data, index) => (
              <Link to={data.linkTo} key={index}>
                <div className="flex gap-2 text-center items-center cursor-pointer hover:bg-black/10 transition-colors duration-500 hover:rounded p-3" >
                  <img className="category-img w-6 h-6 mb-1" src={data.Icon} />
                  <span className="text-xs text-black font-normal" > {data.name} </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
