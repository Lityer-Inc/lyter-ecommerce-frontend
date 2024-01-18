import React from "react";
import data from "../DummyData/data.js";
import Card from "../components/Card.jsx";
import { nanoid } from "nanoid";
export default function BabyCare({ img, title, description, price }) {
  const babyCareData = data.find((data) => data.name === "baby_care");
  return (
    <div className="page-wrapper">
      <div className="baby-care-page-container category-page-container">
        <div className="baby-care-title catchphrase text-center mb-4 text-3xl">
          Your baby deserves the&nbsp;<u>best</u>.
        </div>
      </div>
      <div className="baby-care-items category-items">
        {
          <div key={nanoid()}>
            <Card
              img={babyCareData.img}
              title={babyCareData.title}
              description={babyCareData.description}
              price={babyCareData.price}
              id={babyCareData.id}
            />
          </div>
        }
      </div>
    </div>
  );
}
