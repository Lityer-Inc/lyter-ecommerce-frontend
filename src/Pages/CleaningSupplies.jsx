import React from "react";
import data from "../DummyData/data.js";
import Card from "../components/Card.jsx";
import { nanoid } from "nanoid";
export default function CleaningSupplies({ img, title, description, price }) {
  const cleaningSuppliesData = data.find((data) => data.name === "cleaning_supplies");
  return (
    <div className="page-wrapper">
      <div className="cleaning-supplies-page-container category-page-container">
        <div className="cleaning-supplies-title catchphrase text-center mb-4 text-3xl">
          Trustworthy and&nbsp;<u>reliable</u>&nbsp;cleaning supplies.
        </div>
      </div>
      <div className="cleaning-supplies-items category-items">
        {
          <div key={nanoid()}>
            <Card
              img={cleaningSuppliesData.img}
              title={cleaningSuppliesData.title}
              description={cleaningSuppliesData.description}
              price={cleaningSuppliesData.price}
              id={cleaningSuppliesData.id}
            />
          </div>
        }
      </div>
    </div>
  );
}
