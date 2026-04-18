import React from "react";

const Modal = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-30 flex justify-center items-center z-40"
      onClick={onClick}
    ></div>
  );
};

export default Modal;
