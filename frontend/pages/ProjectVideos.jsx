"use client";

const projectVideos = [
  {
    title: "Sign post india",
    video: "./videos/signpost india.mp4",
    thumbnail: "./img/Sign post india.png",
  },
  {
    title: "Notepad Application",
    video: "./videos/notepad.mp4",
    thumbnail: "./img/notepad.png",
  },
  {
    title: "Hotel Website",
    video: "./videos/Hotel.mp4",
    thumbnail: "./img/Hotel.png",
  },
  {
    title: "WE THINKE LASTIC",
    video: "./videos/we thinks.mp4",
    thumbnail: "./img/we thinks.png",
  },
  {
    title: "catbury website",
    video: "./videos/catbury.mp4",
    thumbnail: "./img/catbury.png",
  },
  {
    title: "zanjo digital studio",
    video: "./videos/zanjo.mp4",
    thumbnail: "./img/zanjo.png",
  },
  {
    title: "realtime-collab-platform",
    video: "./videos/realtimeplatform.mp4",
    thumbnail: "./img/realtimeplatform.png",
  },
  {
    title: "Uber Clone - Real-time Ride Sharing Platform",
    video: "./videos/uberproject.mp4",
    thumbnail: "./img/uberproject.png",
  },
];



import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Footer from "./Footer";

function ProjectVideoCard({ title, video, thumbnail, onWatch, onDownload, onShare, index }) {
  const cardRef = useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1 + (index || 0) * 0.08,
        }
      );
    }
  }, [index]);

  // GSAP hover animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => {
      gsap.to(el, { scale: 1.07, boxShadow: "0 8px 32px 0 rgba(59,130,246,0.25)", duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(el, { scale: 1, boxShadow: "0 4px 16px 0 rgba(0,0,0,0.15)", duration: 0.3, ease: "power2.inOut" });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative bg-gradient-to-br from-[#232946] to-[#181e2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col group transition-transform duration-300"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <video
          src={video}
          poster={thumbnail}
          className="w-full h-full object-cover bg-black transition-opacity duration-300 group-hover:opacity-80"
          controls
          preload="none"
          style={{ borderRadius: "1rem 1rem 0 0" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-lg font-semibold text-white drop-shadow-lg">{title}</span>
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onWatch}
            className="cursor-pointer bg-blue-500/80 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded shadow-lg font-semibold mb-1"
          >
            Watch
          </button>
          <button
            onClick={onDownload}
            className="cursor-pointer bg-green-500/80 hover:bg-green-600 text-white text-xs px-3 py-1 rounded shadow-lg font-semibold mb-1"
          >
            Download
          </button>
          <button
            onClick={onShare}
            className="cursor-pointer bg-pink-500/80 hover:bg-pink-600 text-white text-xs px-3 py-1 rounded shadow-lg font-semibold"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}


function ProjectVideos() {
  const [modal, setModal] = useState({ open: false, video: null, title: "" });
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleWatch = (video, title) => {
    setModal({ open: true, video, title });
    setShowModal(true);
  };

  const handleDownload = (video, title) => {
    const link = document.createElement('a');
    link.href = video;
    link.download = title + ".mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (video) => {
    const url = window.location.origin + video;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert(`Link copied to clipboard!`);
    } else {
      prompt("Copy this link:", url);
    }
  };

  // Animate modal open/close
  useEffect(() => {
    if (showModal && modal.open && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
    if (!modal.open && modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setShowModal(false),
      });
    }
  }, [modal.open, showModal]);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#0f172a] via-[#181e2a] to-[#232946] text-white py-10 px-2 mb-10 pt-20" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'auto' }}>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-2xl tracking-tight">
        Project Videos
      </h1>
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {projectVideos.map((project, idx) => (
          <ProjectVideoCard
            key={idx}
            {...project}
            index={idx}
            onWatch={() => handleWatch(project.video, project.title)}
            onDownload={() => handleDownload(project.video, project.title)}
            onShare={() => handleShare(project.video, project.title)}
          />
        ))}
      </div>

      {/* Modal for watching video */}
      {showModal && typeof window !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'auto',
              overscrollBehavior: 'contain',
              maxHeight: '100vh',
            }}
          >
            <div
              ref={modalRef}
              className="bg-[#181e2a] rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative flex flex-col items-center overflow-y-auto"
              style={{ maxHeight: '80vh', WebkitOverflowScrolling: 'touch', touchAction: 'auto' }}
            >
              <button
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full px-3 py-1 text-sm font-bold shadow-lg cursor-pointer"
                onClick={() => setModal({ open: false, video: null, title: "" })}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">{modal.title}</h2>
              <video
                src={modal.video}
                controls
                autoPlay
                className="w-full rounded-lg shadow-lg bg-black"
                style={{ maxHeight: '60vh' }}
              />
            </div>
          </div>,
          document.body
        )
      }
      <Footer/>
    </div>
  );
}

export default ProjectVideos;


