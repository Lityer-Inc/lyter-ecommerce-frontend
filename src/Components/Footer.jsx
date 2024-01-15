import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"; 

import SouthIcon from '@mui/icons-material/South';
import { ShopContext } from '../context/shop-context';
import NorthIcon from '@mui/icons-material/North';

export default function Footer() {
  const { setLoginModal, user } = useContext(ShopContext);
  const [moreInfo, setmoreInfo] = useState(false);
  return (
    //Main container - Footer*
    <footer className="w-full fixed bottom-1 mt-16 border-t-2 bg-[#e7e7e7] border-b-0">
      <div className="flex relative flex-col">
        <button className={`flex absolute bottom-[99%] rounded border-2 border-b-0 font-semibold text-[13px] px-[20px] h-[32px] items-center self-center  ${moreInfo ? "bg-[#f7f7f7]" : "bg-[#fff]"}`}
          onClick={() => { setmoreInfo(!moreInfo) }}>
          More information
          {moreInfo ? <SouthIcon className="icon-footer" /> : <NorthIcon className="icon-footer" />}
        </button>
        <div className={`bg-[#f7f7f7] px-[50px]`}>
          <div className={`flex justify-between flex-col sm:flex-row  transition-all ${moreInfo ? "h-auto duration-700" : "h-0 fixed opacity-0 duration-0 "}`}>
            <div className="nav-footer-col">
              <h3 className="nav-footer-title">About</h3>
              <ul>
                <li>
                  <Link>About us</Link>            
                </li>
                <li>
                  <Link>Investor relations</Link>
                </li>
                <li>
                  <Link>Sustainability</Link>
                </li>
              </ul>
            </div>
            <div className="nav-footer-col">
              <h3 className="nav-footer-title">Help</h3>
              <ul>
                <li>
                  <Link>How to buy</Link>
                </li>
                <li>
                  <Link>Become a Shopper</Link>
                </li>
                <li>
                  <Link>Security Center</Link>
                </li>
              </ul>
            </div>
            <div className="nav-footer-col">
              <h3 className="nav-footer-title">Social networks</h3>
              <ul>
                <li>
                  <Link>X</Link>
                </li>
                <li>
                  <Link>Facebook</Link>
                </li>
                <li>
                  <Link>Instagram</Link>
                </li>
              </ul>
            </div>
            <div className="nav-footer-col">
              <h3 className="nav-footer-title">My account</h3>
              <ul>
                <li>
                  <div className=" cursor-pointer" onClick={() => {setLoginModal(1)}}>Login</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <ul className="flex flex-row gap-4 text-[1rem] text-gray-800 font-semibold">
          <li>
            <Link>Terms and conditions</Link>
          </li>
          <li>
            <Link>Privacy Policy</Link>
          </li>
          <li>
            <Link>Accessibility</Link>
          </li>
          <li>
            <Link>Help</Link>
          </li>
        </ul>
        <small className="nav-footer-copyright">Copyright ©&nbsp;...</small>
      </div>
    </footer>
  );
}
