"use client";
import Loader from "@/components/ui/Loader";
import { addGame, getPlatform } from "@/utils/action";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const AddGame = () => {
  const [load, setLoad] = useState(false);
  const [platform, setPlatform] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState();
  const [game, setGame] = useState({
    name: "",
    type: "",
    category: "",
    platform: "",
    status: "",
    tagName: "",
    slug: "",
    url: "",
    thumbnail: null,
    payoutFile: null,
  });

  const [disable, setDisable] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      const selectedFile = files[0];
      setGame({
        ...game,
        thumbnail: selectedFile,
      });
      const input = document.getElementById("fileUpload");
      const file = input.files;
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          console.log(event.target.value);
          setThumbnailPreview(event.target.result);
        };
        fileReader.readAsDataURL(file[0]);
      } else {
        setThumbnailPreview(null);
      }
    } else {
      setGame({
        ...game,
        [name]: files ? files[0] : value,
      });
    }
  };

  const handleClearFile = () => {
    setGame({
      ...game,
      thumbnail: null,
    });
    setThumbnailPreview(null);
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(game).every(
      (field) => field !== "" && field !== null
    );
    setDisable(!allFieldsFilled);
  }, [game]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      game.url === "" ||
      game.name === "" ||
      game.status === "" ||
      game.tagName === "" ||
      game.category === "" ||
      game.platform === "" ||
      game.slug === "" ||
      game.type === "" ||
      game.thumbnail === null ||
      game.payoutFile === null
    ) {
      return toast.error("All fields are required!");
    }
    const data = new FormData();
    for (const key in game) {
      data.append(key, game[key]);
    }
    setLoad(true);
    const response = await addGame(data);
    if (response?.error) {
      setLoad(false);
      return toast.error(response.error);
    } else {
      toast.success("Game Added successfully!");
      setGame({
        name: "",
        type: "",
        category: "",
        platform: "",
        status: "",
        tagName: "",
        slug: "",
        url: "",
        thumbnail: null,
        payoutFile: null,
      });
      setDisable(true);
      setThumbnailPreview(null);
      setLoad(false);
    }
  };

  //Get Platforms
  const handelPlatform = async () => {
    const response = await getPlatform();
    if (response?.error) {
      return toast.error(response.error);
    } else if (response?.length > 0) {
      setPlatform(response);
    }
  };
  useEffect(() => {
    handelPlatform();
  }, []);

  return (
    <>
      <div className="h-[90%] w-full flex items-center dark:bg-Dark justify-center">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-4 gap-y-6 overflow-hidden w-[90%] md:w-[70%] lg:w-[50%] m-auto px-8 py-6 rounded-xl bg-white dark:bg-Dark_light text-black dark:text-white border-[#8b7cfd5b] border-[1px]"
        >
          <p className="text-left font-light">Name :</p>
          <input
            name="name"
            onChange={handleChange}
            value={game.name}
            bo
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e] "
          />
          <p className="text-left font-light">Category :</p>
          <input
            name="category"
            onChange={handleChange}
            value={game.category}
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e]"
          />
          <p className="text-left font-light">Platform :</p>
          <select
            name="platform"
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e]"
            onChange={handleChange}
            value={game.platform}
          >
            <option value={""}>Select Platform</option>
            {platform?.map((item, ind) => (
              <option key={ind} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <p className="text-left font-light">Type :</p>
          <input
            name="type"
            onChange={handleChange}
            value={game.type}
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e]"
          />
          <p className="text-left font-light">Tag Name :</p>
          <input
            name="tagName"
            onChange={handleChange}
            value={game.tagName}
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e] "
          />
          <p className="text-left font-light">Slug :</p>
          <input
            name="slug"
            onChange={handleChange}
            value={game.slug}
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e] "
          />
          <p className="text-left font-light">Status :</p>
          <div className="flex gap-5 items-center">
            <div className="min-w-fit w-[30%] flex gap-2">
              <input
                type="radio"
                id="active"
                name="status"
                value="active"
                onChange={handleChange}
              />
              <label for="active">Active</label>
            </div>
            <div className="min-w-fit w-[30%] flex gap-2">
              <input
                type="radio"
                id="inactive"
                name="status"
                value="inactive"
                onChange={handleChange}
              />
              <label for="inactive">Inactive</label>
            </div>
          </div>
          <p className="text-left font-light">Url :</p>
          <input
            name="url"
            onChange={handleChange}
            value={game.url}
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e] "
          />
          <p className="text-left font-light">Thumbnail :</p>
          {!thumbnailPreview ? (
            <input
              onChange={handleChange}
              type="file"
              className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e]"
              id="fileUpload"
              accept="image/*"
              name="thumbnail"
            />
          ) : (
            <div className="ml-3 relative w-fit flex items-start">
              <img
                src={thumbnailPreview}
                alt="Thumbnail-Preview"
                className="h-48 w-auto object-contain"
              />
              <button
                type="button"
                className="text-lg dark:text-white p-[5px] focus:outline-none absolute -right-4 -top-3 dark:bg-[#05040488] rounded-md"
                onClick={handleClearFile}
              >
                <RxCross2 />
              </button>
            </div>
          )}
          <p className="text-left font-light">Payout file :</p>
          <input
            name="payoutFile"
            type="file"
            id="payoutFile"
            accept=".json"
            onChange={handleChange}
            required
            className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-gray-300 dark:border-[#dfdfdf2e] "
          />
          <div className="col-span-2 flex justify-center mt-2">
            <button
              disabled={disable ? true : false}
              type="submit"
              className={` ${
                disable ? "opacity-50 " : "opacity-100 "
              }text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out`}
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

export default AddGame;
