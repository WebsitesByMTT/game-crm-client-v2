"use client";
import { editPassword, generatePassword } from "@/utils/action";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { passwordRegex } from "@/utils/util";

const Password = ({ id, setOpen }) => {
  const [existingPassword, setExistingPassword] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingPassword === "" || password === "" || reEnterPassword === "") {
      return toast.error("All fileds are required!");
    }

    if (password !== reEnterPassword) {
      return toast.error("Both the passwords do not match");
    }

    if (!passwordRegex.test(password) || !passwordRegex.test(reEnterPassword)) {
      return toast.error(
        "Password must have at least 8 characters including at least one uppercase letter, 2 digits, and 1 special character!"
      );
    }

    setLoad(true);
    const response = await editPassword(existingPassword, password, id);
    setLoad(false);
    if (response?.error) {
      return toast.error(response.error);
    }
    toast.success(response.responseData.message);
    setOpen(false);
  };

  const handleGeneratePassword = async (e) => {
    e.preventDefault();
    const generatedPassword = await generatePassword();
    if (generatePassword?.error) {
      return toast.error("Error Generating Password!");
    }
    setPassword(generatedPassword.password);
    setReEnterPassword(generatedPassword.password);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 md:gap-4 overflow-hidden px-5"
      >
        <p className="text-left font-light">Existing Password :</p>
        <input
          name="existingPassword"
          onChange={(e) => setExistingPassword(e.target.value)}
          value={existingPassword}
          className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-500 dark:border-[#dfdfdf2e] "
        />
        <p className="text-left font-light">New Password :</p>
        <div className="flex justify-between w-full gap-2">
          <input
            name="newPassword"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-500 dark:border-[#dfdfdf2e]"
          />
          <button
            onClick={handleGeneratePassword}
            className="px-2 py-1 !rounded-[5px] border-[1px] border-[#70ef44] text-[#70ef44] text-sm"
          >
            Generate
          </button>
        </div>
        <p className="text-left font-light">Re-Enter Password :</p>
        <input
          name="reEnterPassword"
          onChange={(e) => {
            setReEnterPassword(e.target.value);
          }}
          value={reEnterPassword}
          className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-500 dark:border-[#dfdfdf2e] "
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
      <Loader show={load} />
    </>
  );
};

export default Password;
