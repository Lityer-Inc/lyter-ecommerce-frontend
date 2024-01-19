import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { ShopContext } from "../context/shop-context";
import { useSearchParams } from "react-router-dom";

export default function BabyCare() {
  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  const [babyCareData, setBabyCareData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setBabyCareData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpointHead, storeId]);

  // Filter baby care items based on the category
  const filteredBabyCare = babyCareData.filter(
    (item) => item.category === "Baby Care"
  );

  return (
    <div className="page-wrapper">
      <div className="baby-care-page-container category-page-container">
        <div className="baby-care-title catchphrase text-center mb-4 text-3xl">
          Your baby deserves the&nbsp;<u>best</u>.
        </div>
      </div>
      <div className="baby-care-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredBabyCare.map((item) => (
          <div key={nanoid()} className="grid-item">
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
