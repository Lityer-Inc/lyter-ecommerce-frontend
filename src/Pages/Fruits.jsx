import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/shop-context.jsx";

export default function Fruits() {
  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  const [fruitsData, setFruitsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setFruitsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpointHead, storeId]);

  // Filter Fruits based on the category
  const filteredFruits = fruitsData.filter(
    (fruit) => fruit.category === "Fruits"
  );

  return (
    <div className="page-wrapper">
      <div className="fruits-page-container category-page-container">
        <div className="fruits-title catchphrase text-center mb-4 text-3xl">
          Nothing gets you going like&nbsp;<u>fresh</u>&nbsp;fruit.
        </div>
      </div>
      <div className="vegetables-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredFruits.map((fruit) => (
          <div key={nanoid()}>
            <Card
              data={fruit}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
