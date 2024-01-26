import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { ShopContext } from "../context/shop-context";
import { useSearchParams } from "react-router-dom";

export default function FrozenFoods() {
  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  const [frozenFoodsData, setFrozenFoodsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setFrozenFoodsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpointHead, storeId]);

  // Filter frozen foods based on the category
  const filteredFrozenFoods = frozenFoodsData.filter(
    (item) => item.category === "Frozen Foods"
  );

  return (
    <div className="page-wrapper">
      <div className="frozen-foods-page-container category-page-container">
        <div className="frozen-foods-title catchphrase text-center mb-4 text-3xl">
          Easy to eat,&nbsp;<u>delicious</u>&nbsp;frozen food!
        </div>
      </div>
      <div className="meats-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredFrozenFoods.map((item) => (
          <div key={nanoid()} className="grid-item">
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
