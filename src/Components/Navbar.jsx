import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import Account from "./Account";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SearchIcon from "@mui/icons-material/Search";
import CartMain from "./CartMain";
import { ShopContext } from "@/context/shop-context";

export default function Navbar() {
  const { isCheckoutOpen, setIsCheckoutOpen } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // If it is on a cell phone, we cancel the overflow of the main page
  function handleHamburgerClick() {
    setIsMenuOpen(!isMenuOpen);
    isMenuOpen
      ? (document.body.style.overflow = "initial")
      : (document.body.style.overflow = "hidden");
  }

  useEffect(() => {
    // Function to update the screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach the handleResize function to the window resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <>
      {/*Main container - navbar*/}
      <div className={`sticky top-0 z-20 transition-all duration-500`}>
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

              <div
                onClick={handleHamburgerClick}
                className={`block cursor-pointer md:hidden`}
              >
                <img className="w-8 h-8 mr-5 mb-1" src="/menu.png" />
              </div>
              <MobileNav
                isMenuOpen={isMenuOpen}
                toggleMobileMenu={handleHamburgerClick}
              />

              <Link
                to="/store"
                className="hidden md:flex items-center justify-evenly px-4 py-2 w-[300px] hover:bg-[#fcbd3f] duration-500 transition-all rounded-lg cursor-pointer"
              >
                <SpaceDashboardIcon className="rotate-90" />
                <span className="text-md text-black font-bold font-sans">
                  All stores
                </span>
              </Link>
              <div className="w-full pl-8 relative header-searchbar rounded-lg flex items-center hover:border-black/50 bg-white p-2">
                <SearchIcon className="absolute left-3 cursor-pointer" />
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
                <CartMain />
                {/* <CheckoutPage
                  isCartOpen2={isCheckoutOpen}
                  toggleMobileCart={handleCartShopClick}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
