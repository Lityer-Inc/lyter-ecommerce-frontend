import Breadcrumbs from '@mui/material/Breadcrumbs';
import React from "react";

export default function Stores({ data }) {
  if (data.products.length === 0) {
    // If there are no products, return null to hide the store
    return null;
  }

  return (
    <>
      <div className="cardS bg-gray-50 max-w-[400px]">
        {/* image */}
        <div className="cardS-img h-16 w-16">
          <img className="h-16 py-3 object-cover" src={data?.avatar} />
        </div>

        {/* title, categorys and tags */}
        <div className="cardS-content h-full">
          <div className="cardS-title">{data?.name}</div>
          <p className="mt-2 relative">
            {/* <Breadcrumbs className='separator' separator="•">{data.category.map((item) => (
              <div className="cardS-category text-[#636367]/90 font-semibold inline-flex mr-1 px-1">{item}</div>
            ))}
            </Breadcrumbs> */}
          </p>
          {/* <p className=" inline-block mt-1">{data.tags.map((item) => ( */}
            <div className="cardS-tags inline-flex mr-1 px-1">{data?.sales}</div>
          {/* // ))} */}
          {/* </p> */}
        </div>
        
        {/* delivery and discount */}
        <div className="cardS-footer">
          {data.deliveryTime ?
            <span className="cardS-delivery flex items-center">
              <svg className="w-3" height="1em" viewBox="0 0 24 24" fill="#108910" xmlns="http://www.w3.org/2000/svg" color="brandPrimaryRegular" aria-hidden="true"><path d="M12.79 10.33 14.74 2h-1.27L5.54 12.63v1.05h5.67L9.26 22h1.27l7.93-10.62v-1.05h-5.67Z"></path></svg>
              Delivery by {data?.deliveryTime}
            </span>
            : ""}
            {data.description ?
              <span className="cardS-discount flex items-center">
                <svg className="w-3 h-3" height="1em" viewBox="0 0 24 24" fill="#D43684" xmlns="http://www.w3.org/2000/svg" color="brandPromotionalRegular" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="m11 21-8-8L13 3h5l3 3v5L11 21Zm4.5-11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                </svg>{data.description.length > 10 ? `${data.description.substring(0, 10)}...` : data.description}
              </span>
              : ""}
        </div>
      </div >
    </>
  );
}