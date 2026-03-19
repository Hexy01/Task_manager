"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#612D53] text-[#F3F4F4] border-b border-[#853953]">
      
      <h1 className="text-xl font-bold text-[#F3F4F4]">
        Taskify ✨
      </h1>

      <div className="flex gap-6">
        <Link href="/" className="hover:text-[#D2C4B4] transition">
          Home
        </Link>
        <Link href="/login" className="hover:text-[#D2C4B4] transition">
          Login
        </Link>
        <Link href="/dashboard" className="hover:text-[#D2C4B4] transition">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}