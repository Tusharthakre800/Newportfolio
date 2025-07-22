import React, { useEffect, useRef } from "react";
import gsap from "gsap";

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
      className="bg-[#1e293b] w-full h-20 text-white  md:px-20 flex flex-col bottom-0 right-0  fixed md:flex-row justify-between items-center gap-4 border-t border-blue-400 z-100000"
    >
      <h3 className="text-lg font-semibold">© 2025 Tushar Thakre</h3>

      <div className="flex gap-4 text-blue-400">
        <a href="https://www.linkedin.com/in/tusharthakre/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/Tusharthakre800" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="mailto:tusharthakre800@gmail.com">Email</a>
        <a href="https://www.instagram.com/heyy_tushu/" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
