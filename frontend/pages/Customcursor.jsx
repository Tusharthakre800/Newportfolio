
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e) => {
      gsap.to(cursorOuterRef.current, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.9,
        ease: "power2.out",
      });

      gsap.set(cursorInnerRef.current, {
        x: e.clientX - 1,
        y: e.clientY - 1,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleHover = () => {
      gsap.to(cursorOuterRef.current, {
        scale: 2,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      });
    };
    const handleLeave = () => {
      gsap.to(cursorOuterRef.current, {
        scale: 1,
        backgroundColor: "transparent",
      });
    };

    const targets = document.querySelectorAll("a, button, .hover-target svg , .hover-target , img, .hover-target *"); 
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorOuterRef}
        className="w-10 h-10 border-2 border-white rounded-full fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      ></div>
      <div
        ref={cursorInnerRef}
        className="w-2 h-2 bg-white rounded-full flex align-center  fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      ></div>
    </>
  );
};

export default CustomCursor;
