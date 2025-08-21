import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animated, setAnimated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation with transition
  const handleNavigation = (e, path) => {
    e.preventDefault();

    // Don't navigate if we're already on this page
    if (location.pathname === path) return;

    // Use the global method exposed by PageTransition component
    if (window.startPageTransition) {
      window.startPageTransition(path);
    } else {
      // Fallback if transition not available
      navigate(path);
    }
  };

  // Refs for animation
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  // Animation effect
  useEffect(() => {
    // Only run animation once
    if (!animated) {
      const tl = gsap.timeline({ delay: 0.5 }); // Delay to start after loader

      // Animate navbar container
      tl.from(navbarRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.7)",
      });

      // Animate logo
      tl.from(logoRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.5");

      // Animate nav links
      tl.from(navLinksRef.current, {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3");

      // Apply animation to all nav links
      navLinksRef.current.forEach((link) => {
        gsap.fromTo(link, {
          opacity: 0,
          y: -10,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      setAnimated(true);
    }
  }, [animated]);

  // Animate mobile menu open/close
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        mobileLinksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, delay: 0.1, ease: "power2.out" }
      );
    }
    // No animation here for closing; handled in handleCloseMenu
  }, [isOpen]);

  // Helper for closing with animation
  const handleCloseMenu = () => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(false);
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 w-full z-[9999]" style={{pointerEvents: 'auto'}}>
      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mt-4 shadow-lg">
          {/* Logo */}
          <div className="text-xl font-bold text-white">Tushar <span className='rocket'>🚀</span></div>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li className="nav-link">
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => handleNavigation(e, '/')}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => handleNavigation(e, '/about')}
              >
                About
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                to="/project"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => handleNavigation(e, '/project')}
              >
                Projects
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => handleNavigation(e, '/contact')}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                to="/project-videos"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => handleNavigation(e, '/project-videos')}
              >
                project videos
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                to="/chatbot"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => handleNavigation(e, '/chatbot')}
              >
                ChatBot
              </NavLink>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex items-center justify-center overflow-y-auto max-h-screen"
          style={{ opacity: 0 }} // initial opacity for animation
        >
          {/* Close icon in mobile menu */}
          <button
            onClick={handleCloseMenu}
            className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="flex flex-col space-y-8 text-center text-2xl">
            <li ref={el => mobileLinksRef.current[0] = el}>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => {
                  handleCloseMenu();
                  handleNavigation(e, '/');
                }}
              >
                Home
              </NavLink>
            </li>
            <li ref={el => mobileLinksRef.current[1] = el}>
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => {
                  handleCloseMenu();
                  handleNavigation(e, '/about');
                }}
              >
                About
              </NavLink>
            </li>
            <li ref={el => mobileLinksRef.current[2] = el}>
              <NavLink
                to="/project"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => {
                  handleCloseMenu();
                  handleNavigation(e, '/project');
                }}
              >
                Projects
              </NavLink>
            </li>
            <li ref={el => mobileLinksRef.current[3] = el}>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => {
                  handleCloseMenu();
                  handleNavigation(e, '/contact');
                }}
              >
                Contact
              </NavLink>
            </li>
            <li ref={el => mobileLinksRef.current[4] = el}>
              <NavLink
                to="/project-videos"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => {
                  handleCloseMenu();
                  handleNavigation(e, '/project-videos');
                }}
              >
                Projects video
              </NavLink>
            </li>
            <li ref={el => mobileLinksRef.current[4] = el}>
              <NavLink
                to="/chatbot"
                className={({ isActive }) => isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition-colors'}
                onClick={(e) => {
                  handleCloseMenu();
                  handleNavigation(e, '/chatbot');
                }}
              >
                ChatBot
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
