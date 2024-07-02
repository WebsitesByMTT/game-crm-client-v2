"use client";
import { editGames } from "@/utils/action";
import React, { useState } from "react";
import toast from "react-hot-toast";

const EditGame = ({
  prevstatus,
  prevslug,
  id,
  setRefresh,
  setOpen,
  refresh,
}) => {
  const [status, setStatus] = useState(prevstatus);
  const [slug, setSlug] = useState(prevslug);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "" || slug === "") {
      return toast.error("All fileds are required!");
    }
    try {
      setRefresh(!refresh);
      const response = await editGames(status, slug, id);
      toast.success("Game updated succesfully!");
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 overflow-hidden px-5"
    >
      <p className="text-left font-light">Status :</p>
      <div className="flex gap-5 items-center">
        <div className="min-w-fit w-[30%] flex gap-2">
          <input
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
            type="radio"
            id="inactive"
            name="status"
            value="inactive"
            onChange={(e) => setStatus(e.target.value)}
          />
          <label for="inactive">Inactive</label>
        </div>
      </div>
      <p className="text-left font-light">Slug :</p>
      <input
        name="slug"
        onChange={(e) => setSlug(e.target.value)}
        value={slug}
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

export default EditGame;
