import React from "react";
import data from "../DummyData/data.js";
import Card from "../components/Card.jsx";
import { nanoid } from "nanoid";
export default function Fruits({ img, title, description, price }) {
  const fruitsData = data.find((data) => data.name === "fruits");
  return (
    <div className="page-wrapper">
      <div className="fruits-page-container category-page-container">
        <div className="fruits-title catchphrase text-center mb-4 text-3xl">
          Nothing gets you going like&nbsp;<u>fresh</u>&nbsp;fruit.
        </div>
      </div>
      <div className="fruits-items category-items">
        {
          <div key={nanoid()}>
            <Card
              img={fruitsData.img}
              title={fruitsData.title}
              description={fruitsData.description}
              price={fruitsData.price}
              id={fruitsData.id}
            />
          </div>
        }
      </div>
    </div>
  );
}
