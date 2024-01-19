import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../components/Card.jsx";
import { nanoid } from "nanoid";
import { ShopContext } from "../context/shop-context";
import { useSearchParams } from "react-router-dom";

export default function PersonalCare() {
  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  const [personalCareData, setPersonalCareData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setPersonalCareData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpointHead, storeId]);

  // Filter personal care items based on the category
  const filteredPersonalCare = personalCareData.filter(
    (item) => item.category === "Personal Care"
  );

  return (
    <div className="page-wrapper">
      <div className="personal-care-page-container category-page-container">
        <div className="personal-care-title catchphrase text-center mb-4 text-3xl">
          Treat yourself&nbsp;<u>well</u>.&nbsp;
        </div>
      </div>
      <div className="personal-care-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredPersonalCare.map((item) => (
          <div key={nanoid()} className="grid-item">
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
