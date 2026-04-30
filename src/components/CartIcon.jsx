import React from "react";
import Icon from "./Icon";
export default function CartIcon({ children, name, className }) {
  return (
    <div>
      <div className={className}>
        <div className="absolute right-0 -top-2 rounded-full bg-black text-white size-3 flex justify-center items-center text-[0.5rem]">
          {children}
        </div>
        <Icon name={name} className="size-6" />
      </div>
    </div>
  );
}
