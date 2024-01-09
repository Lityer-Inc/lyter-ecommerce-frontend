import React, { useContext, useState, useEffect, useRef } from "react";
import { ShopContext } from "../context/shop-context";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Account() {
  const { setLoginModal, userDetails, user } = useContext(ShopContext);
  const [selectCurrency, setSelectCurrency] = useState("usdt");
  const [openCurrency, setOpenCurrency] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const accModal = useRef(null);
  const balModal = useRef(null);

  // const token = Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (accountModal && !accModal.current.contains(event.target)) {
        setAccountModal(false);
      }

      if (openCurrency && !balModal.current.contains(event.target)) {
        setOpenCurrency(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectCurrency, openCurrency, accountModal, user]);

  const logout = async () => {
    await Cookies.set("token", null);
    location.reload();
  };

  return (
    <div className="flex gap-2 text-sm relative max-md:hidden">
      <div
        className="flex gap-1 self-center cursor-pointer shadow-[0_0px_5px_0.5px_rgba(0,0,0,0.06)] rounded-full items-center"
        onClick={() => setAccountModal(!accountModal)}
      >
        <img className="w-[24px]" src="\account-icon.png" />
      </div>

      {accountModal && (
        <div
          ref={accModal}
          className="absolute rounded shadow-lg flex flex-col justify-start gap-3 px-2 py-4 z-[999999999999] bg-[#fff] top-[150%] right-3 w-[200px]"
        >
          <div className="flex gap-2 cursor-pointer w-full rounded hover:bg-[#f5f5f5] p-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </span>
            <Link to="/dashboard" className="font-medium">
              My Account
            </Link>
          </div>

          <div className="flex gap-2 cursor-pointer w-full rounded hover:bg-[#f5f5f5] p-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.25 20h1v-4h-1v4Zm2.5 0h1v-4h-1v4ZM6 9h12V7H6v2Zm12 14q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23ZM3 22V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.675q-.7-.35-1.463-.513T18 11H6v2h7.1q-.425.425-.787.925T11.675 15H6v2h5.075q-.05.25-.063.488T11 18q0 1.05.288 2.013t.862 1.837L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5L3 22Z"
                />
              </svg>
            </span>
            <Link to="/orders" className="font-medium">
              My Orders
            </Link>
          </div>

          <div className="flex gap-2 cursor-pointer w-full rounded hover:bg-[#f5f5f5] p-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.388 2.25t-1.362 2.412q-.975 1.313-2.625 2.963T13.45 19.7L12 21Z"
                />
              </svg>
            </span>
            <Link to="/saved" className="font-medium">
              Saved Items
            </Link>
          </div>

          {(userDetails.email !== null) | undefined ? (
            <div className="flex gap-2 cursor-pointer w-full rounded hover:bg-[#f5f5f5] p-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M160 256a16 16 0 0 1 16-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h160a56.06 56.06 0 0 0 56-56V272H176a16 16 0 0 1-16-16Zm299.31-11.31l-80-80a16 16 0 0 0-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62Z"
                  />
                </svg>
              </span>
              <span className="font-medium">Logout</span>
            </div>
          ) : (
            <button
              onClick={() => {
                setLoginModal(1);
                setAccountModal(false);
              }}
              className="outline-none bg-[#FF0066] px-5 py-2 text-white rounded"
            >
              Login
            </button>
          )}
        </div>
      )}

      {userDetails.email !== null && (
        <div className="flex items-center">
          <h2
            className="text-[1.2rem] font-semibold pr-3 cursor-pointer"
            // onClick={() => setLoginModal(1)}
          >
            {userDetails.name}
          </h2>{" "}
          <button
            className="font-semibold px-3 hover:bg-red-500 bg-red-400 text-white py-1 text-center rounded-md"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
