import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";

const Modal = ({ data, open, setOpen, editing, setEditing }) => {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (editing) {
      setEdit(true);
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
    setOpen(false);
    setEditing(false);
  };

  return (
    <>
      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
              setEdit(false);
              setEditing(false);
            }
          }}
          className="fixed top-0 left-0 h-full w-full bg-[#00000092] backdrop-blur-[2px] z-10 flex items-center justify-center"
        >
          <div className=" border-[1.5px] border-[#dfdfdf2e] relative m-auto w-[90%] sm:w-[40%] animate-scale h-auto sm:min-w-[500px] bg-[#1a1a1a] rounded-md py-8 text-lg p-4 text-white">
            <div className="flex -mt-3 justify-between items-start pb-4 mb-4 border-[#dfdfdf23] border-b-[1px]">
              <p className="text-left text-white text-2xl font-medium drop-shadow-sm  ">
                Account Details
              </p>
              <div className="flex gap-2 text-2xl text-white">
                <button className="" onClick={() => setEdit(open)}>
                  <RiEdit2Fill />
                </button>
                <button
                  className=""
                  onClick={() => {
                    setOpen(false);
                    setEdit(false);
                    setEditing(false);
                  }}
                >
                  <IoMdCloseCircle />
                </button>
              </div>
            </div>

            {edit ? (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4 overflow-hidden px-5"
              >
                <p className="text-left font-light">Username :</p>
                <input
                  className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
                  value={data.username}
                />
                <p className="text-left font-light">Name :</p>
                <input
                  className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
                  value={data.name}
                />
                <p className="text-left font-light">Password :</p>
                <input
                  className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
                  value={data.password}
                />
                <p className="text-left font-light">Role :</p>
                <input
                  className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
                  value={data.role}
                />
                <p className="text-left font-light">Status :</p>
                <input
                  className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
                  value={data.status}
                />
                <p className="text-left font-light">Recharge :</p>
                <input
                  className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
                  value={data.totalRecharged}
                />
                <p className="text-left font-light">Redeem :</p>
                <input
                  className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
                  value={data.totalRedeemed}
                />
                <p className="text-left font-light">Credits :</p>
                <input
                  className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
                  value={data.totalRedeemed}
                />
                <p className="text-left font-light">Login times :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.loginTimes}
                </p>
                <p className="text-left font-light">Last Login :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.lastLogin.split("T")[0]}
                </p>
                <p className="text-left font-light">Created At :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.createdAt.split("T")[0]}
                </p>
                <p className="text-left font-light">Updated At :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.updatedAt.split("T")[0]}
                </p>
                <div className="col-span-2 flex justify-center mt-2">
                  <button
                    type="submit"
                    className="text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-4 overflow-hidden px-5">
                <p className="text-left font-light">Username :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.username}
                </p>
                <p className="text-left font-light">Name :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.name}
                </p>
                <p className="text-left font-light">Password :</p>
                <p className="text-left font-extralight overflow-hidden text-gray-400">
                  {data.password}
                </p>
                <p className="text-left font-light">Role :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.role}
                </p>
                <p className="text-left font-light">Status :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.status}
                </p>
                <p className="text-left font-light">Recharge :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.totalRecharged}
                </p>
                <p className="text-left font-light">Redeem :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.totalRedeemed}
                </p>
                <p className="text-left font-light">Credits :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.credits}
                </p>
                <p className="text-left font-light">Login times :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.loginTimes}
                </p>
                <p className="text-left font-light">Last Login :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.lastLogin.split("T")[0]}
                </p>
                <p className="text-left font-light">Created At :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.createdAt.split("T")[0]}
                </p>
                <p className="text-left font-light">Updated At :</p>
                <p className="text-left font-extralight text-gray-400">
                  {data.updatedAt.split("T")[0]}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
