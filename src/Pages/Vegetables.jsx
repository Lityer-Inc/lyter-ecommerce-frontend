import React, { useRef } from "react";
import data from "../DummyData/data.js";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
import { useSearchParams } from "react-router-dom";

export default function Vegetables() {
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));
  console.log(storeId)
  const vegetablesData = data.find((data) => data.name === "vegetables");
  return (
    <div className="page-wrapper p-5">
      <div className="vegetables-page-container category-page-container">
        <div className="vegetables-title catchphrase text-center mb-4 text-3xl">
          Get your&nbsp;<u>nutrient rich</u>&nbsp;veggies today!
        </div>
      </div>
      <div className="vegetables-items category-items">
        {
          <div key={nanoid()}>
            <Card
              image={vegetablesData?.img}
              title={vegetablesData?.title}
              description={vegetablesData?.description}
              price={vegetablesData?.price}
              id={vegetablesData?.id}
            />
          </div>
        }
      </div>
    </div>
  );
}
