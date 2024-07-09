"use client";
import { editPassword } from "@/utils/action";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Password = ({ id, setRefresh, setOpen, refresh }) => {
  const [existingPassword, setExistingPassword] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingPassword === "" || password === "" || reEnterPassword === "") {
      return toast.error("All fileds are required!");
    } else if (password !== reEnterPassword) {
      return toast.error("Both the passwords do now match");
    }
    try {
      setRefresh(!refresh);
      const response = await editPassword(existingPassword, password, id);
      toast.success(response.responseData.message);
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 md:gap-4 overflow-hidden px-5"
    >
      <p className="text-left font-light">Existing Password :</p>
      <input
        name="existingPassword"
        onChange={(e) => setExistingPassword(e.target.value)}
        value={existingPassword}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">New Password :</p>
      <input
        name="newPassword"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Re-Enter Password :</p>
      <input
        name="reEnterPassword"
        onChange={(e) => {
          setReEnterPassword(e.target.value);
        }}
        value={reEnterPassword}
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

export default Password;
