"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  // ✅ Load user + tasks
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login"); // protect route
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // load user-specific tasks
    const savedTasks = localStorage.getItem(`tasks_${parsedUser.id}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // ✅ Save tasks per user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#2C2C2C] text-[#F3F4F4] px-4 py-8 flex justify-center">
      
      <div className="w-full max-w-xl">

        {/* 👤 User Info */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-300">
            Logged in as: {user.email}
          </p>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/login");
            }}
            className="text-sm px-3 py-1 bg-[#853953] rounded hover:bg-[#612D53]"
          >
            Logout
          </button>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
  <h1 className="text-3xl font-bold text-[#F3F4F4]">
    My Tasks 📝
  </h1>

  {/* 👋 Welcome username */}
  <p className="text-sm text-gray-300 mt-2">
    Welcome, {user.username}
  </p>
</div>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 p-3 rounded-md bg-[#F3F4F4] text-[#2C2C2C] 
            border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#853953]"
            placeholder="Enter task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <button
            onClick={addTask}
            className="px-5 rounded-md bg-[#853953] hover:bg-[#612D53] text-white transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4 flex flex-col items-center">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="w-full max-w-md flex items-center justify-between px-4 py-3 rounded-xl 
              bg-[#D2C4B4] text-[#2C2C2C] shadow-md hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#853953]"></span>
                <span className="truncate">{task}</span>
              </div>

              <button
                onClick={() => deleteTask(index)}
                className="px-3 py-1 rounded-md bg-[#853953] text-white text-sm 
                hover:bg-[#612D53] transition shadow"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}