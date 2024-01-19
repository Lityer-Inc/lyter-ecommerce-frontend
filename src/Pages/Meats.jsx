import React from "react";
import data from "../DummyData/data.js";
import Card from "../components/Card.jsx";
import { nanoid } from "nanoid";
export default function Meats({ img, title, description, price }) {
  const meatsData = data.find((data) => data.name === "meats");
  return (
    <div className="page-wrapper">
      <div className="meats-page-container category-page-container">
        <div className="meats-title catchphrase text-center mb-4 text-3xl">
          {"Can't have a&nbsp; <u>summer cookout</u> &nbsp;without meat!"}
        </div>
      </div>
      <div className="meats-items category-items">
        {
          <div key={nanoid()}>
            <Card
              img={meatsData.img}
              title={meatsData.title}
              description={meatsData.description}
              price={meatsData.price}
              id={meatsData.id}
            />
          </div>
        }
      </div>
    </div>
  );
}
