"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Error({ error, reset }) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return;
}
