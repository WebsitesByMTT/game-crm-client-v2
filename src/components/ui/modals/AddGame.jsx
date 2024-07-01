"use client";
import { addGame, uploadImage } from "@/utils/action";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddGame = ({ setOpen, setRefresh, refresh }) => {
  const [game, setGame] = useState({
    name: "",
    type: "",
    category: "",
    status: "",
    tagName: "",
    slug: "",
    url: "",
    thumbnail: "",
    file: "",
  });
  const [gameThumbnail, setGameThumbnail] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setGame({
      ...game,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      game.url === "" ||
      game.name === "" ||
      game.status === "" ||
      game.tagName === "" ||
      game.category === "" ||
      game.slug === "" ||
      game.type === ""
    ) {
      return toast.error("All fileds are required!");
    }
    const data = new FormData();
    for (const key in game) {
      data.append(key, game[key]);
    }

    try {
      const response = await addGame(data);
      setOpen(false);
      toast.success("Game Added successfully!");
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleImageChange = async (e) => {
    setGameThumbnail(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      const imagedata = {
        image: base64String,
      };
      console.log("Image", imagedata);
      try {
        const response = await uploadImage(imagedata);
        setGame({ ...game, thumbnail: response.data.imageUrl });
      } catch (error) {
        toast.error(error.message);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 overflow-hidden px-5"
    >
      <p className="text-left font-light">Name :</p>
      <input
        name="name"
        onChange={handleChange}
        value={game.name}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Category :</p>
      <input
        name="category"
        onChange={handleChange}
        value={game.category}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Type :</p>
      <input
        name="type"
        onChange={handleChange}
        value={game.type}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Tag Name :</p>
      <input
        name="tagName"
        onChange={handleChange}
        value={game.tagName}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Slug :</p>
      <input
        name="slug"
        onChange={handleChange}
        value={game.slug}
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
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
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full border-b-[1px] border-[#dfdfdf2e] "
      />
      <p className="text-left font-light">Thumbnail :</p>
      <input
        onChange={(e) => handleImageChange(e)}
        type="file"
        className="text-left font-extralight text-gray-400 focus:outline-none bg-transparent w-full"
        id="fileUpload"
        accept="image/*"
      />
      <p className="text-left font-light">Payout file :</p>
      <input
        name="file"
        type="file"
        accept=".json"
        onChange={handleChange}
        required
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

export default AddGame;
