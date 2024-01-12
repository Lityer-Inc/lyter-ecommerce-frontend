import React, { useContext, useEffect, useRef, useState } from "react";
import data from "../DummyData/data.js";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/shop-context.jsx";

// ... (previous imports)

export default function Vegetables() {
  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  const [vegetablesData, setVegetablesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setVegetablesData(data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter vegetables based on the category
  const filteredVegetables = vegetablesData.filter(
    (vegetable) => vegetable.category === "Vegetables"
  );

  return (
    <div className="page-wrapper p-5">
      <div className="vegetables-page-container category-page-container">
        <div className="vegetables-title catchphrase text-center mb-4 text-3xl">
          Get your&nbsp;<u>nutrient-rich</u>&nbsp;veggies today!
        </div>
      </div>
      <div className="vegetables-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredVegetables.map((vegetable) => (
          <div key={nanoid()} className="grid-item">
            <Card
              data={vegetable}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

