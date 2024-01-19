import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { ShopContext } from "../context/shop-context.jsx";
import { useSearchParams } from "react-router-dom";

export default function Dairy() {
  const { endpointHead } = useContext(ShopContext);
  const [dairyData, setDairyData] = useState([]);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setDairyData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpointHead, storeId]);

  // Filter Dairy based on the category
  const filteredDairy = dairyData.filter((dairy) => dairy.category === "Dairy");

  return (
    <div className="page-wrapper">
      <div className="dairy-page-container category-page-container">
        <div className="dairy-title catchphrase text-center mb-4 text-3xl">
          Delicious dairy products you &nbsp;<u>love</u>!
        </div>
      </div>
      <div className="vegetables-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredDairy.map((dairyProduct) => (
          <div key={dairyProduct.id}>
            <Card
              data={dairyProduct}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
