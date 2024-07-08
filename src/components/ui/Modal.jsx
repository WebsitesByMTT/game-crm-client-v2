import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ open, setOpen, modalType, setModalType, children }) => {
  return (
    <>
      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
            }
          }}
          className="fixed top-0 left-0 h-full w-full bg-[#00000092] backdrop-blur-[2px] z-[99] flex items-center justify-center"
        >
          <div className=" border-[1.5px] border-[#dfdfdf2e] relative m-auto w-[90%] sm:w-[40%] animate-scale h-auto sm:min-w-[500px] bg-[#1a1a1a] rounded-md py-8 text-lg p-4 text-white">
            <div className="flex -mt-3 justify-between items-start pb-4 mb-4 border-[#dfdfdf23] border-b-[1px]">
              <p className="text-left text-white text-2xl font-medium drop-shadow-sm  ">
                {modalType}
              </p>
              <button
                className="text-2xl my-auto"
                onClick={() => {
                  setOpen(false);
                  setModalType("");
                }}
              >
                <IoMdCloseCircle />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
