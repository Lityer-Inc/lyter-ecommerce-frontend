import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { ShopContext } from "../context/shop-context.jsx";
import { useSearchParams } from "react-router-dom";

export default function Meats() {
  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  const [meatsData, setMeatsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setMeatsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpointHead, storeId]);

  // Filter meats based on the category
  const filteredMeats = meatsData.filter(
    (meat) => meat.category === "Meats"
  );

  return (
    <div className="page-wrapper p-5">
      <div className="meats-page-container category-page-container">
        <div className="meats-title catchphrase text-center mb-4 text-3xl">
          {"Can't have a&nbsp; <u>summer cookout</u> &nbsp;without meat!"}
        </div>
      </div>
      <div className="meats-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredMeats.map((meat) => (
          <div key={nanoid()} className="grid-item">
            <Card data={meat} />
          </div>
        ))}
      </div>
    </div>
  );
}
