"use client";
import { DeleteUserProps } from "@/utils/Types";
import { useEffect, useRef } from "react";

const DeleteToken: React.FC<DeleteUserProps> = ({ deleteToken }) => {
  const deleteTokensRef = useRef(deleteToken);

  useEffect(() => {
    deleteTokensRef.current = deleteToken;
  },[]);

  useEffect(() => {
      deleteTokensRef.current();
     
  }, []);
  return null;
};

export default DeleteToken;