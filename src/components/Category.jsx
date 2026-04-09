import React from "react";

export default function Category({
  title,
  style = " h-auto  bg-contain bg-no-repeat bg-center text-black text-xl font-[jost] uppercase  mt-10 ",
  children,
}) {
  return (
    <div className={style}>
      <div className="text-center  ">
        <h3 className=" ">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// category card component
