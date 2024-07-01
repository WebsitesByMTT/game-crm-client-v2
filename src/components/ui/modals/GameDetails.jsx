"use client";
import Image from "next/image";
import React from "react";

const GameDetails = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4 overflow-hidden px-5">
      <p className="text-left font-light">Name :</p>
      <p className="text-left font-extralight text-gray-400">{data.name}</p>
      <p className="text-left font-light">Categroy :</p>
      <p className="text-left font-extralight overflow-hidden text-gray-400">
        {data.category}
      </p>
      <p className="text-left font-light">Type :</p>
      <p className="text-left font-extralight text-gray-400">{data.type}</p>
      <p className="text-left font-light">Status :</p>
      <p className="text-left font-extralight text-gray-400">{data.status}</p>
      <p className="text-left font-light">Slug :</p>
      <p className="text-left font-extralight text-gray-400">{data.slug}</p>
      <p className="text-left font-light">Tag Name :</p>
      <p className="text-left font-extralight text-gray-400">{data.tagName}</p>
      <p className="text-left font-light">Url :</p>
      <p className="text-left font-extralight text-gray-400">
        <a href={data.url}>{data.url}</a>
      </p>
      <p className="text-left font-light">Updated At :</p>
      <p className="text-left font-extralight text-gray-400">
        {data?.updatedAt?.split("T")[0]}
      </p>
      <p className="text-left font-light">Thumbnail :</p>
      <div className="relative h-[200px] w-full">
        <Image
          src={data.thumbnail}
          alt={data.slug}
          fill
          className="border-[1px] border-[#dfdfdf45] rounded-md"
        />
      </div>
    </div>
  );
};

export default GameDetails;
