import React from "react";

export default function Category({
  title,
  style = " h-auto  bg-contain bg-no-repeat bg-center text-black text-2xl font-[playfair] uppercase  mt-10 ",
  children,
}) {
  return (
    <div className={style}>
      <div className="text-center underline ">
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

// category card component
