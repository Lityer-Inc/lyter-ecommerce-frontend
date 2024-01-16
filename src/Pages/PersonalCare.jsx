import React from "react";
import data from "../DummyData/data.js";
import Card from "../Components/Card";
import { nanoid } from "nanoid";
export default function PersonalCare({ img, title, description, price }) {
  const personalCareData = data.find((data) => data.name === "personal_care");
  return (
    <div className="page-wrapper">
      <div className="personal-care-page-container category-page-container">
        <div className="personal-care-title catchphrase text-center mb-4 text-3xl">
          Treat yourself&nbsp;<u>well</u>.&nbsp;
        </div>
      </div>
      <div className="personal-care-items category-items">
        {
          <div key={nanoid()}>
            <Card
              img={personalCareData.img}
              title={personalCareData.title}
              description={personalCareData.description}
              price={personalCareData.price}
              id={personalCareData.id}
            />
          </div>
        }
      </div>
    </div>
  );
}