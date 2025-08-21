import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Contact = () => {
  const cardRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Timeline for card, inputs, and button
    const tl = gsap.timeline();
    tl.from(cardRef.current, {
      // y: 60,
      opacity: 1,
      duration: 1.1,
      ease: "power4.out",
    })
      .from(
        inputRefs.current,
        {
          opacity: 1,
          y: 30,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .from(
        buttonRef.current,
        {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name || !email || !message) {
      setError("All fields are required.");
      setSuccess(false);
      return;
    }
    setError("");
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen h-[80vh] relative w-full p-2 sm:p-4 md:p-20 flex flex-col justify-between bg-gradient-to-br from-[#0f172a] via-[#181e2a] to-[#0f172a] text-white md:px-0 absolute overflow-x-hidden">
      {/* Animated floating gradient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[120vw] sm:w-[80vw] h-[120vw] sm:h-[80vw] bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-pink-500/30 rounded-full blur-[120px] sm:blur-[160px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-0 w-[90vw] sm:w-[55vw] h-[90vw] sm:h-[55vw] bg-gradient-to-tr from-pink-500/30 to-blue-500/30 rounded-full blur-[80px] sm:blur-[120px] animate-float-delay"></div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 py-4 sm:py-8 min-h-[400px]">
        <div
          ref={cardRef}
          className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden transition-all duration-500"
        >
          {/* Left: Info Panel */}
          <div className="md:w-2/5 w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-600/80 via-purple-600/60 to-pink-500/50 p-6 sm:p-10 gap-6 sm:gap-8">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQHlIXWSqKLsiQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721561194745?e=2147483647&v=beta&t=Plmrh70e2N2G6fgilwnCfKP5juiRaWPYnP8DarrfwOg"
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white/30 shadow-lg mb-2"
            />
            <h2 className="text-lg sm:text-xl font-bold text-white">Tushar Thakre</h2>
            <p className="text-blue-100 text-center text-sm sm:text-base mb-4">
              Frontend Developer & Designer
            </p>
            <div className="flex gap-3 sm:gap-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919834509178"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/40 transition p-3 rounded-full text-green-500 hover:scale-110"
                title="WhatsApp"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.19-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.23-1.45l-.37-.22-3.68.96.98-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1.01-1 2.46 0 1.45 1.04 2.85 1.19 3.05.15.2 2.05 3.13 5.01 4.27.7.24 1.25.38 1.68.48.71.15 1.36.13 1.87.08.57-.06 1.75-.72 2-1.41.25-.69.25-1.28.18-1.41-.07-.13-.25-.2-.53-.34z"/>
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:tusharthakre800@gmail.com"
                className="bg-white/20 hover:bg-white/40 transition p-3 rounded-full text-blue-600 hover:scale-110"
                title="Email"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="https://github.com/tusharthakre800"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/40 transition p-3 rounded-full text-black hover:scale-110"
                title="GitHub"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.372.823 1.104.823 2.226v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/tusharthakre/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/40 transition p-3 rounded-full text-blue-700 hover:scale-110"
                title="LinkedIn"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/heyy_tushu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/40 transition p-3 rounded-full text-pink-500 hover:scale-110"
                title="Instagram"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13.62a1.13 1.13 0 1 1-2.26 0 1.13 1.13 0 0 1 2.26 0z"/>
                </svg>
              </a>
            </div>
            <div className="mt-4 sm:mt-6 text-center text-blue-100 text-xs">
              <div className="mb-1 flex items-center justify-center gap-2">
                <span className="font-semibold">Email:</span>
                <span className="select-all">tusharthakre800@gmail.com</span>
              </div>
              <div className="mb-1 flex items-center justify-center gap-2">
                <span className="font-semibold">Phone:</span>
                <span className="select-all">+919834509178</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-semibold">Location:</span>
                <span>Nagpur,Maharashtra, India</span>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="hidden md:block w-[2px] bg-gradient-to-b from-blue-400/30 via-white/10 to-pink-400/30 my-8"></div>
          {/* Right: Form */}
          <div className="flex-1 w-full pb-10 sm:pb-20 px-4 sm:px-8 md:p-14 flex flex-col justify-center">
            {/* Show message on mobile, form on md+ */}
            <div className="block md:hidden text-center text-base text-blue-200 ">
              Contact form is available on desktop devices.
              If you'd like to connect with me, feel free to reach out via email or WhatsApp
              
            </div>
            <div className="hidden md:block">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Send a Message
              </h2>
              {error && (
                <p className="text-red-400 text-center mb-2 animate-pulse">{error}</p>
              )}
              {success && (
                <p className="text-green-400 text-center mb-2 animate-bounce">
                  Message sent successfully!
                </p>
              )}
              <form className="space-y-5 sm:space-y-7" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    ref={el => inputRefs.current[0] = el}
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full p-3 sm:p-4 rounded-xl bg-white/20 text-white outline-none border-2 border-white/20 focus:border-blue-400 focus:bg-white/30 transition text-sm sm:text-base"
                    placeholder="Enter your name"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    ref={el => inputRefs.current[1] = el}
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full p-3 sm:p-4 rounded-xl bg-white/20 text-white outline-none border-2 border-white/20 focus:border-blue-400 focus:bg-white/30 transition text-sm sm:text-base"
                    placeholder="Enter your email"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="relative">
                  <textarea
                    ref={el => inputRefs.current[2] = el}
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleInputChange}
                    className="w-full p-3 sm:p-4 rounded-xl bg-white/20 text-white outline-none border-2 border-white/20 focus:border-blue-400 focus:bg-white/30 transition resize-none text-sm sm:text-base"
                    placeholder="Drop your message"
                    required
                  ></textarea>
                </div>
                {(form.name && form.email && form.message) && (
                  <button
                    ref={buttonRef}
                    type="submit"
                    disabled={sending}
                    className="w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-pink-400 hover:to-blue-400 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-xl shadow-lg tracking-wide hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-5"
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Floating animation keyframes */}
      <div className="hidden">
        <div className="animate-float"></div>
        <div className="animate-float-delay"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
