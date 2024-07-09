"use client";
import { editClient, editCredits } from "@/utils/action";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Redeem = ({ setOpen, id }) => {
  const [amount, setAmount] = useState();
  const credits = {
    type: "redeem",
    amount: amount,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      return toast.error("Enter a valid amount");
    }
    try {
      const response = await editCredits(credits, id);
      setOpen(false);
      toast.success(response.responseData.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 overflow-hidden px-5"
    >
      <p className="text-left font-light">Redeem Amount : </p>
      <input
        type="number"
        name="redeem"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <div className="col-span-2 flex justify-center mt-2">
        <button
          type="submit"
          className="text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Redeem;
