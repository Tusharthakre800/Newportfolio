import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CubeLoader = ({ setLoading }) => {
  const loaderRef = useRef(null);
  const containerRef = useRef(null);
  const cubeRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const progressTextRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling during loader
    const handleScroll = (event) => {
      event.preventDefault();
    };
    window.addEventListener("scroll", handleScroll, { passive: false });

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => setLoading(false),
    });

    // Animate the cube first
    tl.from(cubeRef.current, {
      scale: 0,
      rotation: 720,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    })

    // Animate the text
    .from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=0.5")

    // Animate the progress bar
    .from(progressRef.current, {
      scaleX: 0,
      duration: 2.5,
      ease: "power1.inOut",
    }, "-=0.3")

    // Animate the progress text
    .to(progressTextRef.current, {
      innerText: '100%',
      duration: 2.5,
      snap: { innerText: 1 },
      ease: "power1.inOut",
    }, "-=2.5")

    // Hold for a moment
    .to(containerRef.current, {
      scale: 1.05,
      duration: 0.4,
      delay: 0.2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    })

    // Animate out
    .to([cubeRef.current, textRef.current, progressRef.current.parentNode], {
      y: -40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.in",
    })

    // Fade out the loader with smooth horizontal movement
    .to(loaderRef.current, {
      opacity: 0,
      x: -100, // Smooth horizontal movement
      duration: 1.2,
      ease: "power2.inOut", // Smoother easing
      onComplete: () => {
        // Ensure the loader is completely hidden
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none';
        }
      }
    }, "-=0.2");

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setLoading]);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-white flex items-center justify-center z-[9999] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-teal-500/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10"></div>
      </div>

      {/* Loader content */}
      <div ref={containerRef} className="relative z-10 flex flex-col items-center">
        {/* 3D Cube */}
        <div ref={cubeRef} className="cube-wrapper mb-8">
          <div className="cube">
            <div className="cube-face cube-face-front">T</div>
            <div className="cube-face cube-face-back">D</div>
            <div className="cube-face cube-face-right">E</div>
            <div className="cube-face cube-face-left">V</div>
            <div className="cube-face cube-face-top">⚡</div>
            <div className="cube-face cube-face-bottom">⚡</div>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">TUSHAR DEV</h2>
          <p className="text-gray-400 text-sm md:text-base">Building amazing web experiences</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 relative">
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transform origin-left"></div>
          </div>
          <div className="mt-2 text-right text-sm text-gray-400">
            Loading... <span ref={progressTextRef}>0%</span>
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style>
        {`
          /* Grid background */
          .bg-grid {
            background-size: 50px 50px;
            background-image:
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          }

          /* 3D Cube */
          .cube-wrapper {
            perspective: 800px;
            width: 100px;
            height: 100px;
          }

          .cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            animation: cube-rotate 12s infinite linear;
          }

          .cube-face {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: bold;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            background: rgba(59, 130, 246, 0.2);
            backdrop-filter: blur(4px);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }

          .cube-face-front {
            transform: translateZ(50px);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
          }

          .cube-face-back {
            transform: rotateY(180deg) translateZ(50px);
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(147, 51, 234, 0.3));
          }

          .cube-face-right {
            transform: rotateY(90deg) translateZ(50px);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3));
          }

          .cube-face-left {
            transform: rotateY(-90deg) translateZ(50px);
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(236, 72, 153, 0.3));
          }

          .cube-face-top {
            transform: rotateX(90deg) translateZ(50px);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3));
          }

          .cube-face-bottom {
            transform: rotateX(-90deg) translateZ(50px);
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(16, 185, 129, 0.3));
          }

          @keyframes cube-rotate {
            0% {
              transform: rotateX(0deg) rotateY(0deg);
            }
            100% {
              transform: rotateX(360deg) rotateY(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default CubeLoader;
