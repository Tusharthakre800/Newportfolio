import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

// Animated 3D Icosahedron background
function FloatingIcosahedron() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2 + 0.5;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.25;
      mesh.current.position.y = Math.sin(clock.getElapsedTime()) * 0.3;
    }
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <icosahedronGeometry args={[6, 1]} />
      <meshStandardMaterial
        color="#60a5fa"
        wireframe
        opacity={0.18}
        transparent
      />
    </mesh>
  );
}

// Animated 3D Sparkles background
function Sparkles3D({ count = 40 }) {
  const group = useRef();
  const positions = React.useMemo(() => {
    return Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ]);
  }, [count]);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.children.forEach((mesh, i) => {
        mesh.material.opacity = 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 2 + i);
        mesh.position.y += Math.sin(clock.getElapsedTime() * 0.7 + i) * 0.002;
      });
    }
  });
  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#f472b6" : i % 3 === 1 ? "#a78bfa" : "#60a5fa"}
            emissive="#fff"
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

const videos = [
  {
    title: "Sign post india",
    url: "../Media/Videos/signpost india.mp4",
    thumbnail: "../Media/IMG/Sign post india.png",
  },
  {
    title: "Notepad Application",
    url: "../Media/Videos/notepad.mp4",
    thumbnail: "../Media/IMG/notepad.png",
  },
  {
    title: "Hotel Website ",
    url: "../Media/Videos/Hotel.mp4",
    thumbnail: "../Media/IMG/Hotel.png",
  },
  {
    title: "WE THINKE LASTIC",
    url: "../Media/Videos/we thinks.mp4",
    thumbnail: "../Media/IMG/we thinks.png",
  },
  {
    title: "catbury website",
    url: "../Media/Videos/catbury.mp4",
    thumbnail: "../Media/IMG/catbury.png",
    
  },
  {
    title: "Significo Website",
    url: "../Media/Videos/significo.mp4",
    thumbnail: "../Media/IMG/significo.png",
  },
  {
    title: "zanjo digital studio",
    url: "../Media/Videos/zanjo.mp4",
    thumbnail: "../Media/IMG/zanjo.png",
  },
];

const Projectvideos = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const videoRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVideoIdx, setModalVideoIdx] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});

  useEffect(() => {
    // Animate container fade-in
    gsap.from(containerRef.current, {
      opacity: 1,
      y: 40,
      duration: 1,
      ease: "power2.out",
    });

    // Animate each card on scroll
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  // Play video on hover/focus, pause on leave/blur
  const handleMouseEnter = idx => {
    setActiveIdx(idx);
    if (videoRefs.current[idx]) {
      videoRefs.current[idx].play();
      setIsPlaying(prev => ({ ...prev, [idx]: true }));
    }
  };
  const handleMouseLeave = idx => {
    setActiveIdx(null);
    if (videoRefs.current[idx]) {
      videoRefs.current[idx].pause();
      videoRefs.current[idx].currentTime = 0;
      setIsPlaying(prev => ({ ...prev, [idx]: false }));
    }
  };
  const handleTouchStart = idx => {
    setActiveIdx(idx);
    if (videoRefs.current[idx]) {
      videoRefs.current[idx].play();
      setIsPlaying(prev => ({ ...prev, [idx]: true }));
    }
  };
  const handleTouchEnd = idx => {
    setActiveIdx(null);
    if (videoRefs.current[idx]) {
      videoRefs.current[idx].pause();
      videoRefs.current[idx].currentTime = 0;
      setIsPlaying(prev => ({ ...prev, [idx]: false }));
    }
  };

  // Modal open/close
  const openModal = idx => {
    setModalVideoIdx(idx);
    setModalOpen(true);
    setTimeout(() => {
      if (videoRefs.current[`modal-${idx}`]) {
        videoRefs.current[`modal-${idx}`].play();
      }
    }, 100);
  };
  const closeModal = () => {
    setModalOpen(false);
    if (videoRefs.current[`modal-${modalVideoIdx}`]) {
      videoRefs.current[`modal-${modalVideoIdx}`].pause();
      videoRefs.current[`modal-${modalVideoIdx}`].currentTime = 0;
    }
    setModalVideoIdx(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-[#0f172a] via-[#181e2a] to-[#0f172a] text-white pt-20 pb-10 px-2 overflow-y-hidden">
      {/* 3D Fiber background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas camera={{ position: [0, 0, 18], fov: 55 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={0.6} />
          <FloatingIcosahedron />
          <Sparkles3D count={40} />
        </Canvas>
      </div>
      <div ref={containerRef} className="w-full pb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">
          Project Videos Showcase
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
          {videos.map((video, idx) => (
            <div
              key={idx}
              ref={el => (cardsRef.current[idx] = el)}
              className={`relative bg-white/10 border border-white/20 rounded-2xl shadow-xl p-4 flex flex-col items-center transition-all duration-300 backdrop-blur-md
                ${activeIdx === idx ? "scale-105 shadow-2xl border-blue-400/40 z-10 animate-pulse-border" : "hover:scale-[1.03] hover:shadow-2xl hover:border-blue-400/40"}
                card-shiny
              `}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onTouchStart={() => handleTouchStart(idx)}
              onTouchEnd={() => handleTouchEnd(idx)}
              onClick={() => openModal(idx)}
              style={{ cursor: "pointer" }}
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 relative group bg-black">
                {/* Thumbnail overlay */}
                {!isPlaying[idx] && (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300"
                    style={{ pointerEvents: "none" }}
                  />
                )}
                {/* Floating Play Icon */}
                <span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300
                    ${activeIdx === idx ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100"}
                  `}
                >
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="28" r="28" fill="#3B82F6" fillOpacity="0.7"/>
                    <polygon points="24,19 39,28 24,37" fill="#fff"/>
                  </svg>
                </span>
                <video
                  ref={el => (videoRefs.current[idx] = el)}
                  src={video.url}
                  poster={video.thumbnail}
                  className="w-full h-full object-cover"
                  preload="none"
                  muted
                  playsInline
                  tabIndex={-1}
                  style={{ background: "#000" }}
                  onPlay={() => setIsPlaying(prev => ({ ...prev, [idx]: true }))}
                  onPause={() => setIsPlaying(prev => ({ ...prev, [idx]: false }))}
                />
              </div>
              <h3 className="text-lg font-semibold text-center">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for video panel */}
      {modalOpen && modalVideoIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
        >
          <div
            className="relative bg-[#181e2a] rounded-2xl shadow-2xl p-6 max-w-3xl w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-0 bottom-0 cursor-pointer text-white text-2xl font-bold bg-blue-500/80 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600/90 transition"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <video
              ref={el => (videoRefs.current[`modal-${modalVideoIdx}`] = el)}
              src={videos[modalVideoIdx].url}
              poster={videos[modalVideoIdx].thumbnail}
              className="w-full rounded-lg mb-4"
              controls
              autoPlay
              style={{ background: "#000" }}
            />
            <h3 className="text-xl font-semibold text-center text-white">{videos[modalVideoIdx].title}</h3>
          </div>
        </div>
      )}
      {/* Pulse border animation and shiny card animation */}
      <style>
        {`
          @keyframes pulse-border {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3);}
            50% { box-shadow: 0 0 0 8px rgba(59,130,246,0.15);}
          }
          .animate-pulse-border {
            animation: pulse-border 1.5s infinite;
          }
          /* Shiny card animation */
          .card-shiny {
            position: relative;
            overflow: hidden;
          }
          .card-shiny::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -75%;
            width: 50%;
            height: 200%;
            background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%);
            transform: skewX(-20deg);
            pointer-events: none;
            z-index: 30;
            opacity: 0;
            transition: opacity 0.2s;
          }
          .card-shiny:hover::before,
          .card-shiny:active::before,
          .card-shiny.scale-105::before {
            animation: shiny-move 1.1s linear;
            opacity: 1;
          }
          @keyframes shiny-move {
            0% {
              left: -75%;
            }
            60% {
              left: 120%;
            }
            100% {
              left: 120%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Projectvideos;
