import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { ShopContext } from "../context/shop-context";
import { useSearchParams } from "react-router-dom";

export default function Beverages() {
  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  const [beveragesData, setBeveragesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setBeveragesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpointHead, storeId]);

  // Filter beverages based on the category
  const filteredBeverages = beveragesData.filter(
    (item) => item.category === "Beverages"
  );

  return (
    <div className="page-wrapper">
      <div className="beverages-page-container category-page-container">
        <div className="beverages-title catchphrase text-center mb-4 text-3xl">
          Cool off this summer with these&nbsp;<u>ice-cold</u>&nbsp;beverages.
        </div>
      </div>
      <div className="beverages-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredBeverages.map((item) => (
          <div key={nanoid()} className="grid-item">
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
