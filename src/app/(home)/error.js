"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Error({ error }) {
  useEffect(() => {
    toast.error(error.message);
  }, []);

  return error;
}
