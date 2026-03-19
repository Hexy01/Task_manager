"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Signup successful!");
      router.push("/login");

    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2C2C2C] px-4">

      {/* Card */}
      <div className="w-80 space-y-4 p-6 rounded-2xl shadow-lg 
      bg-[#D2C4B4] border border-[#853953]/30">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-[#2C2C2C]">
          Join Taskify ✨
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-[#853953] bg-white text-black"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-[#853953] bg-white text-black"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-[#853953] bg-white text-black"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-md 
            bg-[#853953] hover:bg-[#612D53] text-white 
            transition shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-[#853953] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}