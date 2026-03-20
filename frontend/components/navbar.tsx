"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ✅ Load user initially
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  // ✅ Listen for auth changes (LOGIN / LOGOUT)
  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("authChange", syncUser);

    return () => {
      window.removeEventListener("authChange", syncUser);
    };
  }, []);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange")); // 🔥 trigger update
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#612D53] text-[#F3F4F4] border-b border-[#853953]">
      
      {/* Logo */}
      <Link
        href="/"
        className="text-xl font-bold hover:opacity-80 transition"
      >
        Taskify ✨
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-[#D2C4B4] transition">
          Home
        </Link>

        {!user ? (
          <Link href="/login" className="hover:text-[#D2C4B4] transition">
            Login
          </Link>
        ) : (
          <>
            <Link href="/dashboard" className="hover:text-[#D2C4B4] transition">
              Dashboard
            </Link>

            {/* 👤 Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              
              {/* Icon */}
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#853953] hover:bg-[#a14a6a] transition"
              >
                <span className="text-lg">👤</span>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-[#1f1f1f] rounded-xl shadow-lg border border-[#853953] overflow-hidden z-50">
                  
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-[#333]">
                    <p className="text-sm font-semibold">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Options */}
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#2c2c2c] text-sm"
                  >
                    📋 My Tasks
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#2c2c2c] text-sm"
                  >
                    🏠 Home
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[#2c2c2c] text-sm text-red-400"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}