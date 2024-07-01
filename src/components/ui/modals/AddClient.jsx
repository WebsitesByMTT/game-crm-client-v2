"use client";
import { addClient } from "@/utils/action";
import { getCookie } from "@/utils/cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddClient = ({ setOpen, setRefresh, refresh, role }) => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "",
    role: "",
    credits: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
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
    } else if (user.credits < 0) {
      return toast.error("Credit can't be negative");
    }
    try {
      const response = await addClient(user);
      setOpen(false);
      toast.success("Client Added successfully!");
      setUser({
        username: "",
        name: "",
        password: "",
        role: "",
        credits: "",
      });
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 overflow-hidden px-5"
    >
      <p className="text-left font-light">Username :</p>
      <input
        name="username"
        onChange={handleChange}
        value={user.username}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Name :</p>
      <input
        name="name"
        onChange={handleChange}
        value={user.name}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Password :</p>
      <input
        name="password"
        onChange={handleChange}
        value={user.password}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Role :</p>
      <input
        name="role"
        onChange={handleChange}
        value={user.role}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Credits :</p>
      <input
        name="credits"
        type="number"
        onChange={handleChange}
        value={user.credits}
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

export default AddClient;
