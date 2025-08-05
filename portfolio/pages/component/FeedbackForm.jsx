
import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackDisplay from "./FeedbackDisplay";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/feedback`);
    // const res = await axios.get(`https://tusharwebdev.online/api/feedback`);
    setFeedbacks(res.data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await axios.post(`https://www.tusharwebdev.online/api/feedback`, { name, message });
      await axios.post(`${import.meta.env.VITE_API_BASE}/api/feedback`, { name, message });
      setName("");
      setMessage("");
      setSuccess(true);
      fetchFeedbacks();
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#1a1a2e] text-white relative overflow-x-hidden">
      {/* Animated floating glassmorphic shapes */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10vw] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10vw] right-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-full blur-[100px] animate-float-delay"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[20vw] h-[20vw] bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-[80px] animate-float-x"></div>
      </div>

      <div className="w-full max-w-2xl px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg tracking-tight">
          <span className="inline-flex items-center gap-2">
            Share Your Feedback
          </span>
        </h2>
        <form onSubmit={handleSubmit} className="relative bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 mb-12 backdrop-blur-2xl flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-blue-200">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
              autoComplete="off"
              maxLength={32}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-pink-200">Feedback</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Feedback..."
              required
              rows={4}
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition shadow-sm"
              maxLength={400}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={` cursor-pointer w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 hover:bg-gradient-to-l transition-all duration-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2"><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Submitting...</span>
            ) : (
              <>
                Submit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </>
            )}
          </button>
          {success && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white px-6 py-2 rounded-full shadow-lg text-base font-semibold animate-fade-in">
              Thank you for your feedback!
            </div>
          )}
        </form>
      </div>
        <FeedbackDisplay feedbacks={feedbacks} fetchFeedbacks={fetchFeedbacks} />
      {/* Floating animation keyframes and micro-interactions */}
      <style>{`
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
        @keyframes float-x {
          0%, 100% { transform: translateY(0px) translateX(0px);}
          50% { transform: translateY(-20px) translateX(30px);}
        }
        .animate-float-x {
          animation: float-x 20s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(.36,1.56,.64,1) both;
        }
        @keyframes float-emoji {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-emoji {
          animation: float-emoji 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FeedbackForm;
