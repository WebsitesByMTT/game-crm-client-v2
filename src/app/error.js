"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Error({ error, reset }) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <main className="bg-transparent h-screen w-screen border-2">
    </main>
  );
}
