"use client";
import {editStatus } from "@/utils/action";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";

const ClientStatus = ({ setOpen, id, prevStatus }) => {
  const [status, setStatus] = useState(prevStatus);
  const [load,setLoad]=useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "") {
      return toast.error("Status is required");
    }
    try {
      setLoad(true)
      const response = await editStatus(status, id);
      setOpen(false);
      toast.success(response.responseData.message);
      setLoad(false)
    } catch (error) {
      toast.error(error.message);
      setLoad(false)
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 md:gap-4 overflow-hidden px-5"
      >
        <p className="text-left font-light">Status : </p>
        <div className="flex gap-2 md:gap-5 items-center">
          <div className="min-w-fit w-[30%] flex gap-2">
            <input
              className="cursor-pointer scale-150"
              type="radio"
              id="active"
              name="status"
              value="active"
              onChange={(e) => setStatus(e.target.value)}
            />
            <label for="active">Active</label>
          </div>
          <div className="min-w-fit w-[30%] flex gap-2">
            <input
              className="cursor-pointer scale-150"
              type="radio"
              id="inactive"
              name="status"
              value="inactive"
              onChange={(e) => setStatus(e.target.value)}
            />
            <label for="inactive">Inactive</label>
          </div>
        </div>
        <div className="col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            className="text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
      <Loader show={load}/>
    </>

  );
};

export default ClientStatus;
