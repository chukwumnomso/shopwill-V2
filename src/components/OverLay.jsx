import React from "react";

export default function OverLay({
  children,
  style = "  absolute top-0 left-0 h-full w-full  text-white bg-linear-to-b from-black/10 to-black/80  flex items-center justify-center",
}) {
  return <div className={style}>{children}</div>;
}
