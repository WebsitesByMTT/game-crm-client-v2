import React from "react";
import ReactDOM from "react-dom";

export default function Loader() {

  const modalElement = document.getElementById("loader");
  if (!modalElement) {
    return null;
  }
  {return ReactDOM.createPortal(
      <div className="fixed zindex top-0 left-0 w-full h-screen">
        <div className="w-full h-screen relative  flex items-center justify-center">
          <svg className="loader" viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
    </div>,
    modalElement
    )}
};