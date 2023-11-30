import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/shop-context";
import axios from "axios";

export default function Signup() {
  // is this the right way to get env values ?
  const { storeToken, setLoginModal, endpointHead, setAlertState, setAlert } =
  useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr, setEmailerr] = useState(false);
  const [passworderr, setPassworderr] = useState(false);

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log('endpoint : ', endpointHead);
    if (password.length < 6) {
      setPassworderr(true);
      alert("Password Length is too short !");
    }

    e.preventDefault();
    console.log("passed and running");
    try {
      console.log("email : ", email);
      console.log("password : ", password);
      const response = await axios.post(
        `${endpointHead}/auth/signup_customer`,
        {
          email: email,
          name: name,
          password: password
        }
      );
      // Handle the response from the authentication endpoint
      console.log("resonse : ", await response);
      //push to local storage
      if (response.status === 200) {
        storeToken(response.data.token);
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
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m4 8l2.05 1.64a.48.48 0 0 0 .4.1a.5.5 0 0 0 .34-.24L10 4" />
                <circle cx="7" cy="7" r="6.5" />
              </g>
            </svg>
          ),
          status: "success",
          msg1: "Account Created",
          msg2: "Login to proceed",
          action: "Proceed"
        });
        setLoginModal(0);
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
              <g fill="none" stroke="currentColor" stroke-linejoin="round">
                <path
                  stroke-width="2"
                  d="M2 14.5A4.5 4.5 0 0 0 6.5 19h12a3.5 3.5 0 0 0 .5-6.965a7 7 0 0 0-13.76-1.857A4.502 4.502 0 0 0 2 14.5Z"
                />
                <path stroke-width="3" d="M12 15.5h.01v.01H12z" />
                <path stroke-linecap="round" stroke-width="2" d="M12 12V9" />
              </g>
            </svg>
          ),
          status: "failed",
          msg1: "Account Creation failed",
          msg2: `Reason: ${response.message}`,
          action: "Retry"
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log("errorr");
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(endpointHead, "test test");
  }, [emailerr, passworderr]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="user-box ">
          <input
            value={email}
            placeholder="email"
            onChange={(e) => handleEmail(e)}
            type="text"
            className={
              emailerr && "border-b border-red-500 .!border-red-500-important"
            }
          />
          <label>Email</label>
        </div>
        <div className="user-box ">
          <input
            value={name}
            placeholder="Full Name"
            onChange={(e) => handleName(e)}
            type="text"
            className={
              emailerr && "border-b border-red-500 .!border-red-500-important"
            }
          />
          <label>Full Name</label>
        </div>
        <div className="user-box">
          <input
            required=""
            value={password}
            onChange={(e) => handlePassword(e)}
            type="password"
            className={
              passworderr &&
              "border-b border-red-500 .!border-red-500-important"
            }
          />
          <label>Password</label>
        </div>
        <p
          className={passworderr && "font-semibold text-red-500 text-[1.2rem]"}
        >
          {passworderr && "Invalid Password"}
        </p>
        <button type="submit">
          <a>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign up
          </a>
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <a href="" class="a2">
          Sign up!
        </a>
      </p>
    </>
  );
}
