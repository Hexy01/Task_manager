"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2C2C2C] px-4">
      <div className="w-80 space-y-4 p-6 rounded-2xl shadow-lg 
      bg-[#D2C4B4] border border-[#853953]/30">

        <h2 className="text-2xl font-semibold text-center text-[#2C2C2C]">
          Welcome Back ✨
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded-md border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-[#853953] bg-white text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded-md border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-[#853953] bg-white text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-md 
          bg-[#853953] hover:bg-[#612D53] text-white 
          transition shadow-md"
        >
          Login
        </button>

        {/* ✅ FIXED HERE */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-[#853953] cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}