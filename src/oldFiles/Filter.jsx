import React from 'react'

export default function Filter() {

    const filts = [
        {name: "New", Icon: "Icon" },
        {name: "Popular", Icon: "Icon" },
        {name: "Closest", Icon: "Icon" },
        {name: "Snacks", Icon: "Icon" },
        {name: "Materials", Icon: "Icon" }
    ]


  return (
    <div className='w-full h-full flex gap-7 items-center md:pl-16 p-5 my-9'>
       <span>Sort by</span>
       <div className="flex gap-5 w-100 overflow-x-auto">
          {
          filts.map((data, key) => (
            <div className="flex text-sm border border-gray-400 rounded-[30px] p-2 cursor-pointer" key={key}>
            <span>{data.name}</span>
            <span>{data.Icon}</span>
           </div>
          ))
          }
       </div> 
    </div>
  )
}
