"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#2C2C2C] text-[#F3F4F4] flex flex-col items-center justify-center text-center px-4">
      
      {/* Hero */}
      <h1 className="text-5xl font-bold mb-4">
        Organize Your Life 📝
      </h1>

      <p className="max-w-md mb-6 text-gray-300">
        A simple and beautiful task manager to keep your work and life on track.
      </p>

      {/* 👋 Logged-in Greeting (nice touch) */}
      {user && (
        <p className="text-sm text-[#D2C4B4] mb-4">
          Welcome {user.username} 👋
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        
        {/* 🔥 Dynamic Button */}
        <Link href={user ? "/dashboard" : "/login"}>
          <button className="px-6 py-3 bg-[#853953] hover:bg-[#612D53] text-white rounded-xl transition">
            {user ? "Go to Dashboard" : "Get Started"}
          </button>
        </Link>

        {/* Secondary Button */}
        <Link href="/dashboard">
          <button className="px-6 py-3 border border-[#853953] text-[#F3F4F4] rounded-xl hover:bg-[#853953] transition">
            View Tasks
          </button>
        </Link>
      </div>

      {/* Card */}
      <div className="mt-12 w-full max-w-md p-5 rounded-xl bg-[#D2C4B4] text-[#2C2C2C] shadow-lg">
        <p className="text-left text-sm mb-2 text-gray-600">Today's Tasks</p>
        <ul className="text-left space-y-1">
          <li>✔ Finish project</li>
          <li>✔ Study for interview</li>
          <li>⬜ Go for a walk</li>
        </ul>
      </div>

    </div>
  );
}