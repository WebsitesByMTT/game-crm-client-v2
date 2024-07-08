"use client";

import { setUserData } from "@/store/userSlice";
import { useDispatch } from "react-redux";

const DataSetter = ({ data }) => {
  const dispatch = useDispatch();
  dispatch(setUserData(data));
  return <></>;
};

export default DataSetter;
