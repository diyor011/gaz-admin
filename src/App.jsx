import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function App() {
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
