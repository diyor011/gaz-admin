import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { checkTokenExpiration } from "./redux/authSlice";

export default function App() {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkTokenExpiration());
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex gap-8">
        <Sidebar />
        <div className="pt-4 w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
