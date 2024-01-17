import React from "react";

export default function Alert({ info }) {
  return (
    <div className="excuseme absolute w-[400px] h-[150px] top-[100px] right-[50px] bg-[#fff] shadow-lg shadow-[#f5f5f5]-500 flex flex-col z-[999999999] justify-center rounded-2xl px-10">
      {/* up */}
      <div className="flex items-center gap-4">
        <div
          className={` w-16 h-16 p-2 flex justify-center items-center rounded-[50%] ${
            info.status && info.status == "warn"
              ? "text-yellow-800 bg-yellow-50"
              : info.status == "failed"
              ? "text-red-800 bg-red-50"
              : "text-green-800 bg-green-50"
          } `}
        >
          {info.icon}
        </div>
        <div
          className={` flex flex-col ${
            info.status && info.status == "warn"
              ? "text-yellow-800"
              : info.status == "failed"
              ? "text-red-800"
              : "text-green-800"
          } `}
        >
          <span className="font-semibold text-lg">{info.msg1}</span>
          <span className="font-light text-sm">{info.msg2}</span>
        </div>
      </div>

      {/* down */}
      <div className="flex justify-end">
        <button className="outline-none border-none bg-[#FF0066] px-5 py-2 text-white rounded">
          {info.action}
        </button>
      </div>
    </div>
  );
}