import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLogin from "./AdminLogin";

const AdminFeedback = () => {
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/feedback`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const deleteFeedback = async (id) => {
    if (!token) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE}/api/feedback/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFeedbacks();
    } catch (err) {
      console.error("Delete error:", err);
      if (err.response && err.response.status === 401) {
        setToken("");
        localStorage.removeItem("admin_token");
      }
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((fb) =>
    fb.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!token) {
    return <AdminLogin onLoggedIn={(t) => setToken(t)} />;
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0f172a] via-[#181e2a] to-[#0f172a] text-white relative">
      {/* Floating Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-full blur-[100px] animate-float-delay"></div>
      </div>

      <div className="w-full max-w-6xl py-20 relative">
        <button
          onClick={() => {
            setToken("");
            localStorage.removeItem("admin_token");
          }}
          className="absolute top-[125px] right-4 bg-red-500 px-4 py-2 rounded md:top-[120px] sm:top-[70px] sm:right-2 cursor-pointer hover:bg-red-600 transition-colors duration-200"
        >
          Logout
        </button>

        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg text-center mb-6">
          Admin Feedback Panel
        </h2>

        <div className="flex justify-center mb-6 mt-15">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-[#1e293b] placeholder-gray-400"
          />
        </div>

        <div className="w-full h-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredFeedbacks.length === 0 && (
            <p className="text-center text-gray-400 col-span-full">No feedbacks found.</p>
          )}

          {filteredFeedbacks.map((fb) => (
            <div
              key={fb._id}
              className="w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-2xl p-5 shadow-md relative"
            >
              {/* Date */}
              <p className="text-sm text-gray-400 mb-2">{new Date(fb.createdAt).toDateString()}</p>

              {/* Name */}
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold text-lg mr-2">
                  {fb.name ? fb.name[0].toUpperCase() : "A"}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {fb.name || "Anonymous"}
                </h3>
              </div>

              {/* Full Message */}
              <p className="text-sm text-gray-300 mb-4 break-words whitespace-pre-wrap">
                {fb.message}
              </p>

              <button
                onClick={() => deleteFeedback(fb._id)}
                className="text-white hover:scale-110 transition-transform absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-4 py-2 rounded-full shadow-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px);}
            50% { transform: translateY(-30px);}
          }
          .animate-float {
            animation: float 18s ease-in-out infinite;
          }
          .animate-float-delay {
            animation: float 22s ease-in-out infinite;
            animation-delay: 0.3s;
          }
        `}
      </style>
    </div>
  );
};

export default AdminFeedback;
