import React, { useState } from "react";
import axios from "axios";

const AdminLogin = ({ onLoggedIn }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/admin-auth/login`, {
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("admin_token", res.data.token);
      onLoggedIn(res.data.token);
    } catch (e) {
      setErr("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        {err && <div className="text-red-400 text-center mb-4">{err}</div>}
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
