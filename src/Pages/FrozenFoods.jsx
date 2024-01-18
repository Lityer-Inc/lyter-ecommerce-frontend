import React from "react";
import data from "../DummyData/data.js";
import Card from "../components/Card.jsx";
import { nanoid } from "nanoid";
export default function FrozenFoods({ img, title, description, price }) {
  const frozenFoodsdata = data.find((data) => data.name === "frozen_foods");
  return (
    <div className="page-wrapper">
      <div className="frozen-foods-page-container category-page-container">
        <div className="frozen-foods-title catchphrase text-center mb-4 text-3xl">
          Easy to eat,&nbsp;<u>delicious</u>&nbsp;frozen food!
        </div>
      </div>
      <div className="frozen-foods-items category-items">
        {
          <div key={nanoid()}>
            <Card
              img={frozenFoodsdata.img}
              title={frozenFoodsdata.title}
              description={frozenFoodsdata.description}
              price={frozenFoodsdata.price}
              id={frozenFoodsdata.id}
            />
          </div>
        }
      </div>
    </div>
  );
}
