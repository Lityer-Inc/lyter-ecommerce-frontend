import React, { useState, useContext } from "react";
import { ShopContext } from "../context/shop-context";
import axios from "axios";

export default function Login() {
  const {
    setLoginModal,
    setUser,
    storeToken,
    endpointHead,
    setAlertState,
    setAlert
  } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [emailerr, setEmailerr] = useState(false);
  const [autherr, setautherr] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (password.length < 6) {
    //   setautherr(true);
    //   return;
    // }

    try {
      const response = await axios.post(`${endpointHead}/user/login`, {
        email: email,
        password: password
      });
      // Handle the response from the authentication endpoint
      
      const token = String(response.data.token);
      if (response.status === 200) {
        storeToken(token);
        setautherr(false);
        setUser(response.data.user);
        setLoginModal(0);
        setAlert(true);
        setAlertState({
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 14 14"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m4 8l2.05 1.64a.48.48 0 0 0 .4.1a.5.5 0 0 0 .34-.24L10 4" />
                <circle cx="7" cy="7" r="6.5" />
              </g>
            </svg>
          ),
          status: "success",
          msg1: "User Logged in",
          msg2: "",
          action: "Start shopping"
        });
        window.location.reload();
      } else {
        setAlert(true);
        setAlertState({
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeLinejoin="round">
                <path
                  strokeWidth="2"
                  d="M2 14.5A4.5 4.5 0 0 0 6.5 19h12a3.5 3.5 0 0 0 .5-6.965a7 7 0 0 0-13.76-1.857A4.502 4.502 0 0 0 2 14.5Z"
                />
                <path strokeWidth="3" d="M12 15.5h.01v.01H12z" />
                <path strokeLinecap="round" strokeWidth="2" d="M12 12V9" />
              </g>
            </svg>
          ),
          status: "failed",
          msg1: "Login failed",
          msg2: `Reason: ${response.message}`,
          action: "Retry"
        });
      }
    } catch (error) {
      setautherr(true);
      // Handle any errors that occurred during the request
      // setAlert(true);
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            required=""
            value={email}
            onChange={(e) => handleEmail(e)}
            type="email"
            // className={
            //   emailerr && "border-b border-red-500 .!border-red-500-important"
            // }
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            required=""
            name=""
            type="password"
            value={password}
            onChange={(e) => handlePassword(e)}
            className={
              autherr && "border-b border-red-500 .!border-red-500-important"
            }
          />
          <label>Password</label>
        </div>
        <p className={autherr && "font-semibold text-red-500 text-[1.2rem]"}>
          {autherr && "Invalid Email or Password"}
        </p>
        <button type="submit">
          <a>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </a>
        </button>
      </form>
      <p>
        {"Don't have an account?"}{" "}
        <a href="" className="a2">
          Sign up!
        </a>
      </p>
    </>
  );
}
