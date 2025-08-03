// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async (msg = null) => {
    const messageToSend = msg !== null ? msg : input;
    if (!messageToSend.trim()) return;

    const userMessage = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: messageToSend }],
            },
          ],
        }
      );

      const botText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      const botReply = { role: "assistant", content: botText };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Gemini API Error:", error.response?.data || error.message);
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ Error fetching response" }]);
    }

    setLoading(false);
  };

  const handleEdit = (idx, content) => {
    setEditIdx(idx);
    setEditValue(content);
  };

  const handleEditSave = async (idx) => {
    if (!editValue.trim()) return;
    setEditIdx(null);
    setEditValue("");
    // Remove the old bot response (assume it's always right after the user message)
    setMessages((prev) => {
      const newMsgs = prev.map((msg, i) => (i === idx ? { ...msg, content: editValue } : msg));
      // Remove the next message if it's a bot response
      if (newMsgs[idx + 1] && newMsgs[idx + 1].role === "assistant") {
        newMsgs.splice(idx + 1, 1);
      }
      return newMsgs;
    });
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: editValue }],
            },
          ],
        }
      );
      const botText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      const botReply = { role: "assistant", content: botText };
      setMessages((prev) => {
        // Insert new bot reply after the edited user message
        const arr = [...prev];
        arr.splice(idx + 1, 0, botReply);
        return arr;
      });
    } catch {
      setMessages((prev) => {
        const arr = [...prev];
        arr.splice(idx + 1, 0, { role: "assistant", content: "❌ Error fetching response" });
        return arr;
      });
    }
    setLoading(false);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditValue("");
  };

  const [copiedIdx, setCopiedIdx] = useState(null);
  const handleCopy = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div className=" fixed inset-0 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#181e2a] to-[#232946] text-white py-10 px-2 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl shadow-2xl p-0 flex flex-col border border-[#232946] backdrop-blur-md bg-[#181e2a]/80 shadow-blue-400/20">
        <div className=" rounded-t-2xl p-1">
          <h2 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-2xl tracking-tight py-2 select-none">
            💬 Gemini ChatBot
          </h2>
        </div>
        <div className="h-[400px] p-4 overflow-y-auto overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400/40 scrollbar-track-transparent bg-gradient-to-b from-[#232946] to-[#181e2a] rounded-b-2xl">
          {messages.length === 0 && !loading && (
            <div className="text-center text-gray-400 mt-20 animate-fadeIn">Start the conversation...</div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 flex group ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-line shadow-lg text-sm font-medium transition-all duration-300  ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-blue-500/80 to-blue-400/60 text-white rounded-br-none border border-blue-400/30 animate-slide-in-right"
                    : "bg-[#232946]/80 text-pink-200 rounded-bl-none border border-pink-400/30 animate-slide-in-left"
                }`}
              >
                {editIdx === idx && msg.role === "user" ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      className="w-full bg-[#181e2a]/80 text-white border border-blue-400/30 rounded-xl p-2 resize-none focus:ring-2 focus:ring-blue-400"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      rows={2}
                      autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        className="px-3 py-1 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition"
                        onClick={() => handleEditSave(idx)}
                      >Save</button>
                      <button
                        className="px-3 py-1 rounded-lg bg-gray-500 text-white text-xs font-semibold hover:bg-gray-600 transition"
                        onClick={handleEditCancel}
                      >Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {msg.content}
                  </div>
                )}
              </div>
              {/* Icon row outside the message bubble, only on hover */}
              <div className="flex items-end ml-2">
                {msg.role === "user" && editIdx !== idx && (
                  <button
                    className="inline-flex text-lg  #848484  bg-transparent px-2 py-1 rounded transition cursor-pointer"
                    onClick={() => handleEdit(idx, msg.content)}
                    title="Edit message"
                    aria-label="Edit message"
                  >
                    {/* Fancy edit (pencil) icon SVG */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.862 4.487a2.25 2.25 0 0 1 3.182 3.182l-9.75 9.75a2 2 0 0 1-.707.464l-3.25 1.083a.5.5 0 0 1-.632-.632l1.083-3.25a2 2 0 0 1 .464-.707l9.75-9.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
                      {msg.role === "assistant" && (
                        copiedIdx === idx ? (
                          <span className="flex items-center gap-1 text-green-400 text-xs font-semibold animate-fadeIn">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#22c55e"/>
                              <path d="M6 10.5l2.5 2.5L14 8.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Copied
                          </span>
                        ) : (
                          <button
                            className="inline-flex text-lg #848484 bg-transparent px-2 py-1 rounded transition cursor-pointer"
                            onClick={() => handleCopy(msg.content, idx)}
                            title="Copy response"
                            aria-label="Copy response"
                          >
                            {/* Fancy copy icon SVG */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                              <rect x="4" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            </svg>
                          </button>
                        )
                      )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-400 animate-pulse flex items-center justify-center gap-1">
              <span>Typing</span>
              <span className="inline-flex">
                <span className="dot-typing bg-gray-400 rounded-full w-2 h-2 mx-0.5 inline-block animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="dot-typing bg-gray-400 rounded-full w-2 h-2 mx-0.5 inline-block animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="dot-typing bg-gray-400 rounded-full w-2 h-2 mx-0.5 inline-block animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex p-2 border-t border-[#232946] bg-[#232946]/80 rounded-b-2xl backdrop-blur-md gap-x-2">
          <input
            className="flex-1 bg-[#181e2a]/80 text-white placeholder-gray-400 border-none outline-none px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-400 focus:bg-[#232946]/80 transition-all duration-200"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading || editIdx !== null}
            autoFocus
          />
          <button
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-2xl font-bold shadow-md hover:from-blue-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-60"
            onClick={() => sendMessage()}
            disabled={loading || editIdx !== null}
            
          >
            <span className="inline-block align-middle transition-transform duration-200">Send</span>
          </button>
        </div>
      </div>
      {/* Tailwind custom animations using arbitrary values */}
      {/* Add these to your tailwind.config.js if you want to persist them project-wide */}
      <style>{`
        @layer utilities {
          .animate-slide-in-right { @apply animate-[slide-in-right_0.4s_cubic-bezier(.68,-0.55,.27,1.55)_both]; }
          .animate-slide-in-left { @apply animate-[slide-in-left_0.4s_cubic-bezier(.68,-0.55,.27,1.55)_both]; }
          .animate-fadeIn { @apply animate-[fadeIn_0.7s_ease]; }
        }
        @keyframes slide-in-right { 0% { opacity: 0; transform: translateX(40px) scale(0.95); } 100% { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes slide-in-left { 0% { opacity: 0; transform: translateX(-40px) scale(0.95); } 100% { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .dot-typing {
          animation-name: bounce-typing;
          animation-duration: 1s;
          animation-iteration-count: infinite;
        }
        @keyframes bounce-typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
      <Footer />
    </div>

  );
};

export default ChatBot;
