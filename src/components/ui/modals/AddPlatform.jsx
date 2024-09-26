import { addPlatform } from "@/utils/action";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddPlatform = ({setOpen, setLoad}) => {
  const [platform, setPlatform] = useState("");
  const handeladdPlatform = async () => {
    if (platform === "") {
      return toast.error("This is a required field");
    }
    setLoad(true);
    const response = await addPlatform({ name: platform });
    setLoad(false);
    if (response?.error) {
      return toast.error(response.error);
    } else if (response?.data?.name) {
      toast.success("Platform added successfuly!");
      setOpen(false);
      setPlatform("");
    }
  };

  return (
    <div className="">
      <div class="mb-5">
        <input
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          type="text"
          placeholder="Add platform"
          id="password"
          className="rounded-md shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className=" flex justify-center mt-2">
        <button
          onClick={handeladdPlatform}
          className="text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddPlatform;
