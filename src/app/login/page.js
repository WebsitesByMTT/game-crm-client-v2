"use client";
import { getCaptcha, loginUser } from "@/utils/action";
import Loader from "@/components/ui/Loader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "", captcha: "" });
  const [hide, setHide] = useState(false);
  const [load, setLoad] = useState(false);
  const [captchaSrc, setCaptchaSrc] = useState("");

  const router = useRouter();

  const fetchCaptcha = async () => {
    try {
      const captcha = await getCaptcha();
      setCaptchaSrc(captcha.responseData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handelChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handelPasswordShowHide = () => {
    setHide(!hide);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password, captcha } = data;
    if (!username || !password) {
      toast.remove();
      return toast.error("All fields are required");
    }

    setLoad(true);
    try {
      const response = await loginUser({ username, password, captcha });
      const { token, message, role } = response.responseData;
      if (token) {
        if (role !== "player") {
          toast.success(message);
          Cookies.set("userToken", token);
          router.push("/");
        } else {
          toast.remove();
          toast.error("Access denied");
        }
      } else {
        toast.error("Token not found");
      }
    } catch (error) {
      toast.remove();
      fetchCaptcha();
      data.captcha = "";
      toast.error(error.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: "url(/bg.png)" }}
        className="bg-[#1a1a1d] bg-cover w-full h-screen flex items-center justify-center relative"
      >
        <div className="relative border-2 border-[#e4e4e42f] bg-[#fff] bg-clip-padding backdrop-filter backdrop-blur-[5px] bg-opacity-10 flex z-[1] items-center justify-center w-[70%] h-[45vh] sm:h-[60vh] lg:w-[25%] sm:min-w-[400px] min-w-[300px] rounded-[1.8vw] p-5">
          <div className="w-full h-full">
            <form
              onSubmit={handleLogin}
              className="absolute top-auto left-0 z-[2] w-full h-[80%] m-auto p-5 flex flex-col items-center justify-evenly"
            >
              <h1 className="text-center font-semibold text-4xl text-[#fff] drop-shadow-xl">
                GAME CRM LOGIN
              </h1>
              <div className="w-[90%] space-y-10 mx-auto text-white">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-xl font-extralight">
                    Username
                  </label>
                  <div className="flex items-center space-x-3 border-[1px] border-[#dfdfdfbc] bg-[#dfdfdf37] rounded-md">
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      value={data.username}
                      onChange={(e) => handelChange(e)}
                      autoComplete="new-username"
                      className="outline-none w-full text-xl px-3 py-2 placeholder:text-xl font-extralight bg-transparent placeholder:font-extralight placeholder:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-xl font-extralight">
                    Password
                  </label>
                  <div className="flex items-center space-x-3 border-[1px] border-[#dfdfdfbc] bg-[#dfdfdf37] rounded-md">
                    <input
                      type={hide ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      value={data.password}
                      onChange={(e) => handelChange(e)}
                      autoComplete="new-password"
                      className="outline-none w-full text-xl px-3 py-2 placeholder:text-xl font-extralight bg-transparent placeholder:font-extralight placeholder:text-white"
                    />
                    {data.password.length > 0 && (
                      <div className="p-2">
                        {!hide ? (
                          <svg
                            onClick={handelPasswordShowHide}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide cursor-pointer lucide-eye"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        ) : (
                          <svg
                            onClick={handelPasswordShowHide}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide cursor-pointer lucide-eye-off"
                          >
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                            <line x1="2" x2="22" y1="2" y2="22" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="captcha" className="text-xl font-extralight">
                    Captcha
                  </label>
                  <div className="flex justify-between w-full flex-1 gap-4">
                    <div className="flex items-center space-x-3 border-[1px] border-[#dfdfdfbc] bg-[#dfdfdf37] rounded-md">
                      <input
                        type="text"
                        name="captcha"
                        placeholder="Enter Captcha"
                        value={data.captcha}
                        onChange={(e) => handelChange(e)}
                        autoComplete="new-captcha"
                        className="outline-none w-full text-xl px-3 py-2 placeholder:text-xl font-extralight bg-transparent placeholder:font-extralight placeholder:text-white"
                      />
                    </div>
                    {captchaSrc && (
                      <div
                        dangerouslySetInnerHTML={{ __html: captchaSrc }}
                        className="h-full border-[#dfdfdfbc] bg-[#ffffffc5] rounded-md"
                      ></div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-center bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md py-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out w-full"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Loader show={load} />
    </>
  );
};

export default Login;
