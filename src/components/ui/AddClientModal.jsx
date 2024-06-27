"use client";

import { AddClientDataApi } from "@/apiConfig/apis";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddClientModal = ({ open, setOpen, setRefresh }) => {
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
    const response = await AddClientDataApi(user);
    const { message } = response.data;
    if (response.status === 201) {
      setOpen(false);
      toast.success("Client Added successfully!");
      setUser({
        username: "",
        name: "",
        password: "",
        role: "",
        credits: "",
      });
    } else {
      message && toast.error(message);
    }
    setRefresh((prev) => {
      !prev;
    });
  };
  return (
    <>
      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
              setUser({
                username: "",
                name: "",
                password: "",
                role: "",
                credits: "",
              });
            }
          }}
          className="fixed top-0 left-0 h-full w-full bg-[#00000092] backdrop-blur-[2px] z-10 flex items-center justify-center"
        >
          <div className=" border-[1.5px] border-[#dfdfdf2e] relative m-auto w-[90%] sm:w-[40%] animate-scale h-auto sm:min-w-[500px] bg-[#1a1a1a] rounded-md py-8 text-lg p-4 text-white">
            <div className="flex -mt-3 justify-between items-start pb-4 mb-4 border-[#dfdfdf23] border-b-[1px]">
              <p className="text-left text-white text-2xl font-medium drop-shadow-sm  ">
                Enter Details
              </p>
            </div>
            {open && (
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddClientModal;
