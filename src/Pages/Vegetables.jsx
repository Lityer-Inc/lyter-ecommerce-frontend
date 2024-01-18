import React from "react";
import data from "../DummyData/data.js";
import Card from "../components/Card.jsx";
import { nanoid } from "nanoid";
export default function Vegetables({ img, title, description, price }) {
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
              img={vegetablesData.img}
              title={vegetablesData.title}
              description={vegetablesData.description}
              price={vegetablesData.price}
              id={vegetablesData.id}
            />
          </div>
        }
      </div>
    </div>
  );
}
