import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-green-600">
        Xush kelibsiz! Siz tizimga kirdingiz ✅
      </h1>
    
    </div>
  );
}
