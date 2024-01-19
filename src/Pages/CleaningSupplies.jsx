import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { ShopContext } from "../context/shop-context";
import { useSearchParams } from "react-router-dom";

export default function CleaningSupplies() {
  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  const [cleaningSuppliesData, setCleaningSuppliesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setCleaningSuppliesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpointHead, storeId]);

  // Filter cleaning supplies based on the category
  const filteredCleaningSupplies = cleaningSuppliesData.filter(
    (item) => item.category === "Cleaning Supplies"
  );

  return (
    <div className="page-wrapper">
      <div className="cleaning-supplies-page-container category-page-container">
        <div className="cleaning-supplies-title catchphrase text-center mb-4 text-3xl">
          Trustworthy and&nbsp;<u>reliable</u>&nbsp;cleaning supplies.
        </div>
      </div>
      <div className="cleaning-supplies-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredCleaningSupplies.map((item) => (
          <div key={nanoid()} className="grid-item">
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}