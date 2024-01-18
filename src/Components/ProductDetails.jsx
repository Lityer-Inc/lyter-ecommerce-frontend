import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useSearchParams } from "react-router-dom";

import { ShopContext } from "../context/shop-context";
import { Carousel } from "../Components/Carousel.jsx";

import TextField from "@mui/material/TextField";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ComboBox from "@mui/material/Autocomplete";
import Preloader from "./Preloader.jsx";
import axios from "axios";

const ProductDetails = () => {
  const { productSelected, setProductSelected, addToCart,endpointHead } =
    useContext(ShopContext);
  const [savedItem, setsavedItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantityPro, setQuantityPro] = useState(1);
  const [productDetails, setProductDetails] = useState();
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));

  // Regular combo box options
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // written entry of the combo box
  const handleInputChange = (event = true, newValue) => {
    newValue ? setQuantityPro(parseInt(newValue, 10)) : setQuantityPro(1);
  };
  // input for options
  const handleChange = (event = false, newValue) => {
    setQuantityPro(newValue);
  };

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await axios.get(`${endpointHead}/stores/${storeId.current}/products/${productSelected?.id}`);
        const productData = await response.data;
        setProductDetails(productData);
        setLoading(false);
      }
      catch (error){
        console.log("error on fetch:", error)
      }
    };
    fetchData();
  }, [])
  
  if (loading) {
    return <Preloader />;
  }


  return (
    <main className={`fixed flex w-full h-full top-0 z-30 justify-center ${productSelected.selected ? "" : "hidden"}`}>
      {/* background */}
      <div
        className=" absolute bg-black/20 w-full h-full"
        onClick={(e) => {
          e.preventDefault();
          setProductSelected({ selected: false });
        }}
      />

      <div
        className={`absolute block overflow-y-auto self-center 
      h-[90%] w-[95%] xl:w-[70%] mx-auto px-7 pt-5 bg-white rounded-xl shadow-2xl shadow-gray-400`}
      >
        {/* container */}
        <div className="flex flex-col gap-6 ">
          {/* back button */}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              setProductDetails({ selected: false });
            }}
            className="flex items-center self-start"
          >
            <IoMdArrowRoundBack className="text-[3rem]" />
            <span className="ml-4">Back</span>
          </Link>

          {/* product details box */}
          <section className="flex md:flex-row flex-col gap-5">
            {/* image */}
            <div className="flex justify-center self-center w-[70%] p-10 
            lg:w-[450px]">
              <img
                src={productDetails?.image}
                alt={productDetails?.name}
                className="w-full h-full self-center object-fit object-center"
              />
            </div>
            {/* title - details */}
            <div className=" flex-auto gap-5 lg:flex-row flex flex-col justify-between">
              <div className="flex flex-col h-full py-4 px-2 self-start">
                <Link
                  to={productDetails?.category}
                  className="-mt-3 text-cyan-500 font-bold hover:underline"
                >
                  {productDetails?.category ? productDetails?.category : "Random"}
                </Link>
                <h1 className="sm:text-[2rem] font-semibold text-[1.5rem]">
                  {productDetails?.name}
                </h1>
                {/* tags of products */}
                {/* <Breadcrumbs className='separator categoryS inline-block' separator="•">{productDetails.details.tags.map((item) => (
                  <Link className="text-cyan-700 font-semibold text-[14px] inline-flex mb-1">{item}</Link>
                ))}
                </Breadcrumbs> */}
              <p className="mt-2 text-red-500">{productDetails?.weight} Available</p>
                <h1 className="font-semibold pb-2 text-[1.2rem]">Details</h1>
                <p className="text-gray-700 flex">
                  {productDetails?.description}
                </p>
              </div>

              {/* right side */}
              <div className="flex-1 max-w-[600px] max-h-[380px] flex relative flex-col gap-4 p-2">
                {/* inside container */}
                <div className="p-5 w-[320px] xl:w-[450px]
                self-center lg:self-end h-full rounded-md border border-gray-400">
                  <h1 className="text-[21px] font-bold text-[#39393c] leading-normal font-inherit">
                    ${productDetails?.price}
                  </h1>
                  <h1 className="text-[16px] font-semibold text-[#636367] mb-1 leading-normal font-['Helvetica']">
                    $
                    {(
                      productDetails?.weight /
                      productDetails?.price
                    ).toFixed(2)}{" "}
                    each
                  </h1>
                  {/* horizontal */}
                  <div className="flex flex-col justify-between gap-2 xl:gap-5 items-center xl:p-4">
                    {/* combobox quantity products */}
                    <div className="relative w-full mt-10">
                      <ComboBox
                        options={options}
                        disableClearable
                        freeSolo
                        onChange={handleChange}
                        onInputChange={handleInputChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            type="number"
                            placeholder={String(quantityPro)}
                            variant="outlined"
                          />
                        )}
                      />
                    </div>

                    {/* add to cart button */}
                    <button
                      className={`px-6 py-4 w-[100%] text-2xl font-bold rounded-3xl text-white transition ease-in-out delay-75 hover:translate-3 hover:translate-y-1 duration-400 ${
                        quantityPro > 100 ||
                        quantityPro < 1 ||
                        isNaN(quantityPro)
                          ? "bg-gray-400"
                          : "bg-green-700"
                      }`}
                      onClick={() => {
                        addToCart(productDetails, quantityPro);
                      }}
                      disabled={
                        quantityPro > 100 ||
                        quantityPro < 1 ||
                        isNaN(quantityPro)
                      }
                    >
                      Add to Cart
                    </button>

                    {/* saved items && add to list */}
                    <div className="flex flex-row justify-between px-4 w-full font-semibold">
                      {savedItem ? (
                        <div
                          onClick={() => {
                            setsavedItem(!savedItem);
                          }}
                          className="flex flex-row items-center gap-1"
                        >
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="#242529"
                            xmlns="http://www.w3.org/2000/svg"
                            color="systemGrayscale80"
                            size="25"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8 3a5.5 5.5 0 0 0-5.5 5.5c0 2.974 1.57 5.67 3.29 7.746 1.734 2.096 3.732 3.696 4.82 4.5.83.61 1.948.611 2.778 0 1.088-.803 3.086-2.404 4.821-4.5C19.93 14.17 21.5 11.474 21.5 8.5A5.5 5.5 0 0 0 12 4.726 5.485 5.485 0 0 0 8 3Z"
                            ></path>
                          </svg>
                          <span className="e-15fzge">Saved</span>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setsavedItem(!savedItem);
                          }}
                          className="flex flex-row items-center gap-1"
                        >
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="#242529"
                            xmlns="http://www.w3.org/2000/svg"
                            color="systemGrayscale80"
                            size="25"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8 5a3.5 3.5 0 0 0-3.5 3.5c0 2.286 1.225 4.532 2.83 6.47 1.59 1.92 3.444 3.41 4.467 4.166.124.09.28.09.403 0 1.025-.756 2.88-2.245 4.469-4.165C18.274 13.032 19.5 10.786 19.5 8.5a3.5 3.5 0 0 0-6.61-1.604l-.666 1.294a.25.25 0 0 1-.444 0l-.667-1.293A3.5 3.5 0 0 0 8 5ZM2.5 8.5A5.5 5.5 0 0 1 12 4.726 5.5 5.5 0 0 1 21.5 8.5c0 2.974-1.57 5.67-3.29 7.746-1.736 2.096-3.734 3.697-4.822 4.5a2.331 2.331 0 0 1-2.778 0c-1.088-.804-3.086-2.404-4.82-4.5C4.07 14.17 2.5 11.474 2.5 8.5Z"
                            ></path>
                          </svg>
                          <span className="e-15fzge">Save</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center gap-1">
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="#242529"
                          xmlns="http://www.w3.org/2000/svg"
                          size="25"
                          color="systemGrayscale80"
                          aria-hidden="true"
                        >
                          <path d="M10 6h10v2H10V6ZM7 11H4v2h3v-2ZM20 11H10v2h10v-2ZM10 16h10v2H10v-2ZM7 16H4v2h3v-2ZM7 6H4v2h3V6Z"></path>
                        </svg>
                        <span className="e-f7ygsf">Add to list</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="p-4">
            <h1 className="sm:text-[1.7rem] pb-10 text-[1.5rem]">
              Similar Products
            </h1>
            {/* Carousel */}
            {/* <Carousel
              filter={productDetails.details?.category}
              productDetails={productDetails.details?.id}
            /> */}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
