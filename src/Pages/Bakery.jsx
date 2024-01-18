import React from "react";
import Card from "../components/Card.jsx";
import data from "../DummyData/data.js";
import { nanoid } from "nanoid";
export default function Bakery({ img, title, description, price }) {
  const bakeryData = data.find((data) => data.name === "bakery");
  return (
    <div className="page-wrapper">
      <div className="bread-page-container category-page-container">
        <div className="bread-title catchphrase text-center mb-4 text-3xl">
          Perfectly baked,&nbsp;<u>fresh</u>&nbsp;bread.
        </div>
      </div>
      <div className="bread-items category-items">
        {
          <div key={nanoid()}>
            <Card
              img={bakeryData.img}
              title={bakeryData.title}
              description={bakeryData.description}
              price={bakeryData.price}
              id={bakeryData.id}
            />
          </div>
        }
      </div>
    </div>
  );
}
