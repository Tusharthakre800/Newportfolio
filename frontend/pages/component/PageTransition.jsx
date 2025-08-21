import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const PageTransition = () => {
  const location = useLocation();
  const overlayRef = useRef(null);
  
  useEffect(() => {
    // Create timeline for page transition
    const tl = gsap.timeline();
    
    // Page exit animation
    tl.to(overlayRef.current, {
      y: 0,
      duration: 0.6,
      ease: "power3.inOut",
      onStart: () => {
        document.body.style.overflow = 'hidden';
      }
    });
    
    // Page enter animation
    tl.to(overlayRef.current, {
      y: '-100%',
      duration: 0.6,
      delay: 0.1,
      ease: "power3.out",
    });
    
  }, [location.pathname]); // Trigger animation on route change
  
  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 flex items-center justify-center text-white text-4xl font-bold bg-gray-900 via--900 to-gray-900 transform -translate-y-full z-[9998] pointer-events-none"
    />
  );
};

export default PageTransition;
