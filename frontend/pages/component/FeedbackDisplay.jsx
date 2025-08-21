import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackDisplay = ({ feedbacks, fetchFeedbacks }) => {
  const [likeAnimating, setLikeAnimating] = useState({});
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);

  useEffect(() => {
    setLoadingFeedbacks(false); // just to initialize
  }, []);

  const handleLike = async (id) => {
    setLikeAnimating((prev) => ({ ...prev, [id]: true }));
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE}/api/feedback/like/${id}`);
      fetchFeedbacks();
    } catch (err) {
      console.error("Like error:", err);
    } finally {
      setTimeout(() => {
        setLikeAnimating((prev) => ({ ...prev, [id]: false }));
      }, 400);
    }
  };

  const skeletonArray = new Array(6).fill(0);

  return (
    <div className="w-full h-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
      {loadingFeedbacks ? (
        skeletonArray.map((_, idx) => (
          <div
            key={idx}
            className="w-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-5 shadow animate-pulse flex flex-col justify-between"
          >
            <div className="w-1/3 h-4 bg-gray-700 rounded mb-2" />
            <div className="w-1/2 h-4 bg-gray-700 rounded mb-2" />
            <div className="w-full h-16 bg-gray-800 rounded mb-2" />
            <div className="w-1/4 h-4 bg-gray-700 rounded self-center" />
          </div>
        ))
      ) : feedbacks.length === 0 ? (
        <p className="text-center text-gray-400 col-span-full">No feedbacks yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div
            key={fb._id}
            className="w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-2xl p-5 shadow-md relative"
          >
            <p className="text-sm text-gray-400 mb-2">{new Date(fb.createdAt).toDateString()}</p>

            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold text-lg mr-2">
                {fb.name[0].toUpperCase()}
              </div>
              <h3 className="text-xl font-semibold text-white">
                {fb.name.length > 6 ? `${fb.name.slice(0, 6)}...` : fb.name}
              </h3>
            </div>

            <p className="text-sm text-gray-300 mb-4 break-words whitespace-pre-wrap">
              {fb.message}
            </p>

            <button
              onClick={() => handleLike(fb._id)}
              className="text-white hover:scale-110 transition-transform absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer"
            >
              <span className={`inline-block text-xl ${likeAnimating[fb._id] ? "animate-like" : ""}`}>
                👍
              </span>
              <span className="ml-2 text-sm">{fb.likes}</span>
            </button>
          </div>
        ))
      )}

      <style>{`
        @keyframes like {
          0% { transform: scale(1); }
          30% { transform: scale(1.5) rotate(-10deg); }
          60% { transform: scale(0.95) rotate(8deg); }
          100% { transform: scale(1); }
        }
        .animate-like {
          animation: like 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FeedbackDisplay;

