import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { ShopContext } from "../context/shop-context";
import { useSearchParams } from "react-router-dom";

export default function Bakery() {
  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  const [bakeryData, setBakeryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpointHead}/stores/${storeId.current}/products`
        );
        const data = await response.json();
        setBakeryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpointHead, storeId]);

  // Filter bakery products based on the category
  const filteredBakery = bakeryData.filter(
    (item) => item.category === "Bakery"
  );

  return (
    <div className="page-wrapper">
      <div className="bread-page-container category-page-container">
        <div className="bread-title catchphrase text-center mb-4 text-3xl">
          Perfectly baked,&nbsp;<u>fresh</u>&nbsp;bread.
        </div>
      </div>
      <div className="meats-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 category-items mt-12">
        {filteredBakery.map((item) => (
          <div key={nanoid()} className="grid-item">
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
