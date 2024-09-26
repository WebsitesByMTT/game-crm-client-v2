import { updateToggle } from "@/utils/action";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Maintenance = ({ maintenance, updateToggle, stopCountdown }) => {
  const [startDate, setStartDate] = useState("");

  const handleChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!maintenance) {
      if (startDate === "") {
        return toast.error("Please select a valid date");
      }
      updateToggle(startDate);
    } else {
      updateToggle("null");
      stopCountdown();
    }
    setStartDate("");
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex gap-5 items-center">
        {!maintenance ? (
          <input
            id="m-input"
            type="datetime-local"
            value={startDate}
            onChange={handleChange}
            className="appearance-none bg-[#dfdfdf] dark:bg-[#4e4c4cea] dark:text-white text-black px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          />
        ) : (
          <p>Are you sure you want to stop maintenance</p>
        )}
        <button
          className="text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
          type="submit"
        >
          {!maintenance ? "Submit" : "Yes"}
        </button>
      </form>
    </div>
  );
};

export default Maintenance;
