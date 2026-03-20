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
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

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
    <div className="min-h-screen bg-[#2C2C2C] text-[#F3F4F4] px-4 py-10 flex justify-center">
      
      <div className="w-full max-w-2xl bg-[#1f1f1f] p-6 rounded-2xl shadow-lg">

        {/* 👋 Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {user.username} 👋
          </h1>
        <br></br>
          {/* 📊 Task Count */}
          <p className="text-gray-500 text-xs mt-2">
            You have {tasks.length} task{tasks.length !== 1 && "s"}
          </p>
        </div>

        {/* ➕ Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            className="flex-1 p-3 rounded-lg bg-[#F3F4F4] text-[#2C2C2C] 
            border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#853953]"
            placeholder="What needs to be done today?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button
            onClick={addTask}
            className="px-5 rounded-lg bg-[#853953] hover:bg-[#612D53] text-white transition"
          >
            Add
          </button>
        </div>

        {/* 📭 Empty State */}
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-6">
            No tasks yet. Start by adding one ✨
          </p>
        )}

        {/* 📋 Task List */}
        <ul className="space-y-4 mt-4 flex flex-col items-center">
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