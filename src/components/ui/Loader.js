import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ show }) => {
  return (
    show && (
      <div className="fixed z-[9999] top-0 left-0 w-full h-full ">
        <div className="bg-black w-full h-screen relative bg-opacity-70 flex items-center justify-center">
          <HashLoader color={"#8C7CFD"} loading={show} size={100} className="animate-spin"/>
        </div>
      </div>
    )
  );
};

export default Loader;
