"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Error({ error }) {
  useEffect(() => {
    console.log("ERRRRRORRRRRR.........")
    toast.error(error.message.Error);
    console.log("error from errorjs", error);
  }, [error]);

  return;
}
