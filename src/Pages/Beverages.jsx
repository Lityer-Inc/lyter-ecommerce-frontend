import React from "react";
import data from "../DummyData/data.js";
import Card from "../components/Card.jsx";
import { nanoid } from "nanoid";
export default function Beverages({ img, title, description, price }) {
  const beveragesData = data.find((data) => data.name === "beverage");
  return (
    <div className="page-wrapper">
      <div className="beverages-page-container category-page-container">
        <div className="beverages-title catchphrase text-center mb-4 text-3xl">
          Cool off this summer with these&nbsp;<u>ice-cold</u>&nbsp;beverages.
        </div>
      </div>
      <div className="beverages-items category-items">
        {
          <div key={nanoid()}>
            <Card
              img={beveragesData.img}
              title={beveragesData.title}
              description={beveragesData.description}
              price={beveragesData.price}
              id={beveragesData.id}
            />
          </div>
        }
      </div>
    </div>
  );
}
