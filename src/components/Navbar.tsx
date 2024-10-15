"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          AquaHunt
        </Link>
        {isLoggedIn ? (
          <div className="flex space-x-4">
            <Link
              href="/add"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
            >
              Add Species
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
