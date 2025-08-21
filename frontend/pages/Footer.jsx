import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.from(footerRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    });
  }, []);

  return (
    <footer
    //   ref={footerRef} 
      className="bg-[#1e293b] w-full h-25 md:h-25 text-white  md:px-20 flex flex-col bottom-0 right-0  fixed md:flex-row justify-between items-center gap-4 border-t border-blue-400 z-100000"
    >
      <h3 className="text-lg font-semibold">© 2025 Tushar Thakre</h3>

      <style>
        {`
          .navlink-hover {
            position: relative;
            display: inline-block;
            overflow: hidden;
          }

          .navlink-hover::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: currentColor;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .navlink-hover:hover::after {
            transform: translateX(0);
          }
        `}
      </style>
      <div className="flex gap-4 text-blue-400 ">
        <a href="https://www.linkedin.com/in/tusharthakre/" target="_blank" rel="noreferrer" className="navlink-hover">
          LinkedIn
        </a>
        <a href="https://github.com/Tusharthakre800" target="_blank" rel="noreferrer" className="navlink-hover">
          GitHub
        </a>
        <a href="mailto:tusharthakre800@gmail.com" className="navlink-hover">Email</a>
        <a href="https://www.instagram.com/heyy_tushu/" target="_blank" rel="noreferrer" className="navlink-hover">
          Instagram
        </a>
        <NavLink to="/feedback" className="navlink-hover">
          Feedback Form
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
