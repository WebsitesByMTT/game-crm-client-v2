"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Error({ error }) {
  useEffect(() => {
    console.log("ERRRRRORRRRRR.........");
    toast.error(error.message.Error);
  }, [error]);

  return;
}
