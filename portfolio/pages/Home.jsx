import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

const Home = () => {
  // State for text animations
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Refs for DOM elements
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const headingTextRef = useRef(null);
  const nameRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  // Text content for typing animation
  const headingText = "Hey, I'm ";
  const nameText = "Tushar Thakre";
  const paragraphText = "A Front-End Developer crafting beautiful, animated UIs.";

  // Text for rotating words animation
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const rotatingWords = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Tailwind",
    "GSAP",
    "UI/UX",
    "Nodejs",
    "MongoDB",
    "Express",

  ];

  // Ref for rotating words
  const rotatingTextRef = useRef(null);

  // Function to create glitch effect
  const createGlitchEffect = (element) => {
    if (!element) return;

    const glitchTl = gsap.timeline({repeat: 1, repeatDelay: 0.3});

    // Random offset values for glitch effect
    const xOffsets = [-2, 3, -1, 2, -3];
    const yOffsets = [1, -1, 2, -2, 1];

    // Create rapid glitch movement
    for (let i = 0; i < 5; i++) {
      glitchTl.to(element, {
        x: xOffsets[i],
        y: yOffsets[i],
        duration: 0.06,
        skewX: i % 2 === 0 ? 3 : 0,
        ease: "power1.inOut"
      });
    }

    // Return to normal
    glitchTl.to(element, {
      x: 0,
      y: 0,
      skewX: 0,
      duration: 0.1,
      ease: "power2.out"
    });

    return glitchTl;
  };

  // Mouse move handler for name hover effect
  const handleMouseMove = (e) => {
    if (!nameRef.current || !isHovering) return;

    const { left, top, width, height } = nameRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance from center
    const moveX = (e.clientX - centerX) / 8;
    const moveY = (e.clientY - centerY) / 8;

    // Apply the movement with GSAP
    gsap.to(nameRef.current, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);

    // Trigger glitch effect first
    createGlitchEffect(nameRef.current);

    // Add glow and scale effect
    gsap.to(nameRef.current, {
      textShadow: "0 0 15px rgba(96, 165, 250, 0.9), 0 0 30px rgba(96, 165, 250, 0.5)",
      scale: 1.1,
      color: "#60a5fa",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    // Reset position and effects
    gsap.to(nameRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      color: "#60a5fa",
      textShadow: "none",
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  // Effect for rotating words animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex(prevIndex => (prevIndex + 1) % rotatingWords.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Main animation effect
  useEffect(() => {
    // Store refs in variables for cleanup
    const heroElement = heroRef.current;
    const headingElement = headingRef.current;
    const headingTextElement = headingTextRef.current;
    const nameElement = nameRef.current;
    const paragraphElement = paragraphRef.current;
    const buttonElement = buttonRef.current;
    const rotatingElement = rotatingTextRef.current;

    // Create a master timeline
    const masterTl = gsap.timeline();

    // Initial container animation
    masterTl.from(heroElement, {
      y: 60,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });

    // Heading container fade in
    masterTl.from(headingElement, {
      opacity: 1,
      scale: 0.8,
      n: 0.5,
      duration: 0.5,
      onComplete: () => setIsLoaded(true)
    });

    // Typing effect for heading text
    masterTl.to(headingTextElement, {
      duration: 1.2,
      delay: 0.5,
      text: headingText,
      ease: "none",
    });

    // Name text animation with glitch effect
    masterTl.from(nameElement, {
      opacity: 1,
      scale: 0.8,
      duration: 0.5,
      ease: "back.out(1.7)",
      onStart: () => {
        // Create advanced glitch effect
        createGlitchEffect(nameElement);
      }
    });

    // Rotating text animation with character-by-character effects
    if (rotatingElement) {
      // Initial setup - hide all words
      gsap.set(rotatingElement.children, { opacity: 0 });

      // Get the first word and its characters
      const firstWord = rotatingElement.children[0];
      const firstWordChars = firstWord.querySelectorAll('span');

      // Hide all characters initially
      gsap.set(firstWordChars, { opacity: 0, y: 20, rotationX: 90 });

      // Show the first word container
      gsap.set(firstWord, { opacity: 1 });

      // Add active class to first word
      firstWord.classList.add('active-word');

      // Animate the container in
      masterTl.from(rotatingElement, {
        opacity: 1,
        y: 20,
        duration: 0.5,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Animate in the characters of the first word one by one
          gsap.to(firstWordChars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        }
      });

      // Set up the word rotation animation
      let currentIndex = 0;
      const wordCount = rotatingElement.children.length;

      const rotateWords = () => {
        // Get current and next indices
        const nextIndex = (currentIndex + 1) % wordCount;

        // Get elements
        const currentWord = rotatingElement.children[currentIndex];
        const nextWord = rotatingElement.children[nextIndex];
        const currentChars = currentWord.querySelectorAll('span');
        const nextChars = nextWord.querySelectorAll('span');

        // Reset next word characters
        gsap.set(nextChars, { opacity: 0, y: 20, rotationX: 90 });

        // Show next word container
        gsap.set(nextWord, { opacity: 1 });

        // Animate current word characters out
        gsap.to(currentChars, {
          opacity: 0,
          y: -20,
          rotationX: -90,
          stagger: 0.03,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            // Remove active class
            currentWord.classList.remove('active-word');
            // Hide current word container
            gsap.set(currentWord, { opacity: 0 });

            // Add active class to next word
            nextWord.classList.add('active-word');

            // Animate next word characters in
            gsap.to(nextChars, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              stagger: 0.05,
              duration: 0.3,
              ease: "back.out(1.7)"
            });
          }
        });

        // Update current index
        currentIndex = nextIndex;
      };

      // Start rotation after a delay
      const rotationTimer = setTimeout(() => {
        const wordInterval = setInterval(rotateWords, 2000);

        // Store interval ID for cleanup
        rotatingElement.dataset.intervalId = wordInterval;
      }, 2000);

      // Store timeout ID for cleanup
      rotatingElement.dataset.timeoutId = rotationTimer;
    }

    // Paragraph text animation - character by character reveal with advanced effects
    // First, ensure all characters are hidden initially
    gsap.set(paragraphElement.children, {
      opacity: 0,
      scale: 0,
      y: () => gsap.utils.random(-80, 80),
      x: () => gsap.utils.random(-40, 40),
      rotation: () => gsap.utils.random(-40, 40),
    });

    // Then animate them in
    masterTl.to(paragraphElement.children, {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotation: 0,
      color: 'white',
      stagger: {
        each: 0.03,
        from: "random"
      },
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
      onComplete: () => {
        // Add 3D floating animation to paragraph
        gsap.to(paragraphElement, {
          y: 5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Add advanced wave effect to characters with randomized parameters
        const chars = paragraphElement.children;
        chars.forEach((char, i) => {
          // Create a unique animation for each character
          gsap.to(char, {
            y: () => Math.sin(i * 0.2) * gsap.utils.random(5, 12),
            x: () => Math.cos(i * 0.3) * gsap.utils.random(2, 6),
            rotationY: () => Math.sin(i * 0.1) * gsap.utils.random(5, 15),
            rotationZ: () => Math.cos(i * 0.1) * gsap.utils.random(2, 8),
            color: i % 3 === 0 ? '#63B3ED' : i % 3 === 1 ? '#9F7AEA' : '#ffffff',
            textShadow: '0 0 5px rgba(0,0,0,0.3)',
            duration: gsap.utils.random(2, 4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.02
          });
        });
      }
    }, "-=0.5");

    // Button animation with modern reveal
    masterTl.from(buttonElement, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
      onComplete: () => {
        // Add gradient shift animation to button
        gsap.to(buttonElement, {
          backgroundPosition: '200% center',
          duration: 3,
          repeat: -1,
          ease: "linear"
        });

        // Add subtle scale animation
        gsap.to(buttonElement, {
          scale: 1.05,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut"
        });
      }
    });

    // Cleanup function
    return () => {
      // Kill all animations to prevent memory leaks
      if (heroElement) gsap.killTweensOf(heroElement);
      if (headingElement) gsap.killTweensOf(headingElement);
      if (headingTextElement) gsap.killTweensOf(headingTextElement);
      if (nameElement) gsap.killTweensOf(nameElement);
      if (paragraphElement) {
        gsap.killTweensOf(paragraphElement);
        // Also kill animations on individual characters
        if (paragraphElement.children) {
          Array.from(paragraphElement.children).forEach(char => {
            gsap.killTweensOf(char);
          });
        }
      }
      if (buttonElement) gsap.killTweensOf(buttonElement);
      if (rotatingElement) {
        gsap.killTweensOf(rotatingElement);
        // Clean up rotating words animation
        if (rotatingElement.children) {
          Array.from(rotatingElement.children).forEach(word => {
            gsap.killTweensOf(word);
          });
        }
        // Clear interval and timeout
        if (rotatingElement.dataset.intervalId) {
          clearInterval(Number(rotatingElement.dataset.intervalId));
        }
        if (rotatingElement.dataset.timeoutId) {
          clearTimeout(Number(rotatingElement.dataset.timeoutId));
        }
      }
    };
  }, []);

  return (
    <div className={`min-h-screen w-full flex items-center justify-center flex-col text-white overflow-hidden  relative pt-5`}>
      <div ref={heroRef} className="text-center space-y-8 relative transform-gpu">
        <h1 ref={headingRef} className="text-4xl md:text-6xl font-bold relative">
          <span ref={headingTextRef} className="inline-block"></span>
          <span
            ref={nameRef}
            className="text-blue-400 inline-block cursor-pointer glitch"
            data-text={nameText}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {isLoaded ? nameText : ''}
          </span>
        </h1>

        <div className="flex flex-col items-center space-y-2">
          <p ref={paragraphRef} className="text-lg md:text-xl font-semibold text-gray-300 transform-gpu relative perspective-500 py-4">
            {paragraphText.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block char-animation font-semibold transform-gpu transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>

          <div className="flex items-center justify-center text-lg md:text-xl">
            {/* <span className="text-gray-400 mr-2">Specialized in</span> */}
            <div ref={rotatingTextRef} className="h-8 overflow-hidden relative w-24 md:w-32">
              {rotatingWords.map((word, index) => (
                <span
                  key={index}
                  className={`rotating-word absolute inset-0 text-blue-400 font-bold opacity-0 flex items-center justify-center`}
                >
                  {word.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="inline-block transform-gpu transition-all duration-300"
                      style={{
                        '--char-index': charIndex,
                        animationDelay: `${charIndex * 0.05}s`,
                        display: 'inline-block',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        <NavLink
          ref={buttonRef}
          to="/project"
          className="mt-8 inline-block px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-size-200 hover:bg-yellow-500 duration-300 text-white hover:text-black rounded-full transition-all shadow-lg hover:shadow-xl"
        >
          <span className="relative z-10">View Projects</span>
        </NavLink>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
