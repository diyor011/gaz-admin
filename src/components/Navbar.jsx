import React, { useState, useEffect } from "react";
import { LogOut, Sun, Moon,  } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  // 1️⃣ Avval localStorage dan oldingi theme-ni olamiz
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // 2️⃣ Theme-ni html ga berish va localStorage ga saqlash
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3️⃣ Theme toggle funksiyasi
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "night" : "light"));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm shadow-info px-8">
      <div className="flex-1">
        <Link to={'/'}>
          <img className="w-20 h-20 py-2" src="logo.png" alt="logo" />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className="swap swap-rotate w-10 h-10 transition-all duration-300">
          {theme === "light" ? (
            <Sun className="w-6 h-6 transition-all duration-300"  />
          ) : (
            <Moon className="w-6 h-6 transition-all duration-300" />
          )}
        </button>

        <button
          onClick={() => dispatch(logout())}
          className="text-base-content px-4 py-2 rounded hover:text-error cursor-pointer transition-all duration-300"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
