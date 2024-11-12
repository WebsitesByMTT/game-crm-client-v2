"use client";
import Loader from "@/components/ui/Loader";
import { addClient, generatePassword } from "@/utils/action";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddClient = () => {
  const data = useSelector((state) => state.user.userData);
  const [load, setLoad] = useState(false);
  const myRole = data?.role;
  const [user, setUser] = useState(() => {
    let initialRole = "";
    switch (myRole) {
      case "company":
        initialRole = "master";
        break;
      case "master":
        initialRole = "distributor";
        break;
      case "distributor":
        initialRole = "subdistributor";
        break;
      case "subdistributor":
        initialRole = "store";
        break;
      case "store":
        initialRole = "player";
        break;
      default:
        initialRole = "";
        break;
    }

    return {
      username: "",
      name: "",
      password: "",
      role: initialRole,
      credits: 0,
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleGeneratePassword = async (e) => {
    e.preventDefault();
    const generatedPassword = await generatePassword();
    if (generatePassword?.error) {
      return toast.error("Error Generating Password!");
    }
    setUser({
      ...user,
      password: generatedPassword.password,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      user.username === "" ||
      user.name === "" ||
      user.password === "" ||
      user.role === "" ||
      user.credits === ""
    ) {
      return toast.error("All fileds are required!");
    }
    if (user.credits < 0) {
      return toast.error("Credit can't be negative");
    }


    setLoad(true);
    const response = await addClient(user);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Client Added Successfully!");
    }
    setUser({
      username: "",
      name: "",
      password: "",
      role: user.role,
      credits: "0",
    });
    setLoad(false);
  };

  return (
    <>
      <div className="h-[90%] w-full  flex items-center dark:bg-Dark justify-center">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 gap-y-10 overflow-hidden w-[90%] md:w-[70%] lg:w-[50%] dark:bg-Dark_light shadow-xl bg-white m-auto px-16 py-12 rounded-2xl text-black dark:text-white border-[#8b7cfd5b] border-[1px]"
        >
          <p className="text-left font-light">Username :</p>
          <input
            name="username"
            onChange={handleChange}
            value={user.username}
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e] "
          />
          <p className="text-left font-light">Name :</p>
          <input
            name="name"
            onChange={handleChange}
            value={user.name}
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e] "
          />
          <p className="text-left font-light">Password :</p>
          <div className="flex justify-between w-full gap-2">
            <input
              name="password"
              onChange={handleChange}
              value={user.password}
              className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e] "
            />
            <button
              onClick={handleGeneratePassword}
              className="px-2 py-1 !rounded-[5px] border-[1px] border-[#70ef44] text-[#70ef44] text-sm"
            >
              Generate
            </button>
          </div>
          <p className="text-left font-light">Role :</p>
          {myRole === "company" ? (
            <select
              name="role"
              id="role"
              value={user.role}
              onChange={handleChange}
              className="outline-none bg-transparent w-full text-left font-extralight text-gray-400 border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e]"
            >
              <option value="master">master</option>
              <option value="distributor">distributor</option>
              <option value="subdistributor">sub-distributor</option>
              <option value="store">store</option>
              <option value="player">player</option>
            </select>
          ) : (
            <input
              name="role"
              type="text"
              value={user.role}
              disabled
              className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e]"
            />
          )}
          <div className="col-span-2 flex justify-center mt-2">
            <button
              type="submit"
              className="text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Loader show={load} />
    </>
  );
};

export default AddClient;
