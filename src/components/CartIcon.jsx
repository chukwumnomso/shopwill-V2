import React from "react";
import Icon from "./Icon";
export default function CartIcon() {
  return (
    <div>
      <div className=" relative">
        <div className="absolute right-0 -top-2 rounded-full bg-black text-white size-4 flex justify-center items-center text-[0.5rem]">
          0
        </div>
        <Icon name="cart" />
      </div>
    </div>
  );
}
