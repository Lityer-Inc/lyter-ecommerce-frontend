import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/shop-context";
import axios from "axios";

export default function Signup() {
  // is this the right way to get env values ?
  const { storeToken, setLoginModal, endpointHead, setAlertState, setAlert } =
    useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passworderr, setPassworderr] = useState(false);
  const [confirmPassworderr, setConfirmPassworderr] = useState(false);

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
  const handleNumber = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  };
  const handleCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };
  const handleAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
    let pswMatch = password.includes(e.target.value);
    if (pswMatch) {
      setConfirmPassworderr(false);
    } else {
      setConfirmPassworderr(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("endpoint : ", endpointHead);
    if (password.length < 4 || confirmPassworderr) {
      setPassworderr(true);
      console.log("confirm password : ", confirmPassworderr);
      alert("Invalid Password or Password Mismatch !");
      throw new Error("Invalid Password or Password Mismatch !");
    }

    try {
      const response = await fetch(`http://localhost:8000/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
          city: city,
          address: address,
          contactNumber: number,
          account_status: true
        })
      });

      const res = await response.json();

      console.log('respnse : ', res);

      //push to local storage
      if (response.status === 200) {
        // storeToken(response.data.token);
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
          msg1: "Account Created",
          msg2: "Login to proceed",
          action: "Proceed"
        });
        setLoginModal(0);
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
          msg1: "Account Creation failed",
          msg2: `Reason: ${res.error}`,
          action: "Retry"
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log("errorr");
      // alert("server error");
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(endpointHead, "test test");
  }, []);

  return (
    <>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="user-box">
          <input
            value={email}
            placeholder="email"
            onChange={(e) => handleEmail(e)}
            type="text"
          />
          <label>Email</label>
        </div>
        <div className="user-box ">
          <input
            value={name}
            placeholder="Full Name"
            onChange={(e) => handleName(e)}
            type="text"
          />
          <label>Full Name</label>
        </div>
        <div className="user-box ">
          <input
            value={number}
            placeholder="Contact Number"
            onChange={(e) => handleNumber(e)}
            type="text"
          />
          <label>Contact Number</label>
        </div>
        <div className="user-box ">
          <input
            value={city}
            placeholder="City"
            onChange={(e) => handleCity(e)}
            type="text"
          />
          <label>City</label>
        </div>
        <div className="user-box ">
          <input
            value={address}
            placeholder="Address"
            onChange={(e) => handleAddress(e)}
            type="text"
          />
          <label>Address</label>
        </div>
        <div className="user-box">
          <input
            required=""
            value={password}
            onChange={(e) => handlePassword(e)}
            type="password"
          />
          <label>Password</label>
        </div>
        {password.length >= 6 && (
          <div className="user-box">
            <input
              required=""
              value={confirmPassword}
              onChange={(e) => handleConfirmPassword(e)}
              type="password"
            />
            <label>Confirm Pasword</label>
            <p className={"font-semibold text-red-500 text-[1.2rem]"}>
              {confirmPassworderr && "password mismatch !"}
            </p>
          </div>
        )}
        <p
          className={passworderr && "font-semibold text-red-500 text-[1.2rem]"}
        >
          {passworderr && "Invalid Password"}
        </p>
        <button type="submit" className="inline-block border py-2 bg-rose-400">
          Sign up
        </button>
      </form>
      <p>
        {"Already have an account ?"}{" "}
        <a href="" className="text-blue-500">
          Login !
        </a>
      </p>
    </>
  );
}
