import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

// Project data
const projectsData = [
  {
    title: "Sign post India Clone",
    description: "  This website was initially very boring, so I enhanced its user experience by adding engaging animations ,For thebest experience, please view it on a laptop" ,
    tech: ["HTML", " Tailwind CSS", "JS", "GSAP"],
    link: "https://tusharthakre800.github.io/signpostindia/",
  },
  {
    title: "Notepad Application",
    description: `I have developed a note-taking application using Express, Node.js, EJS, and the fs module. This is my first backend project,
where I effectively utilized the fs module to manage file operations. This project marks a significant step forward in my backend
development journey, and I'm excited to build more complex applications in the future. For the best experience, please view it
on a laptop.`,
    tech: ["Node.js", "EJS", "Express", "fs" ,"Tailwind CSS" , "Multer"],
    link: "https://backendproject0001.onrender.com/",
  },
  {
    title: "Hotel Website",
    description: `This website is designed to resemble a modern hotel website, with a strong focus on UI/UX. I’ve incorporated a wide range of smooth and engaging animations to elevate the overall user experience and create a visually appealing interface, with fully respnsive design.`,
    tech: ["HTML", " Tailwind CSS", "JS", "GSAP" , "lenis", "React"],
    link: "https://hotel-project-react.vercel.app/",
  },
  {
    title: "We Think Elastic clone",
    description: `It took me several days to clone this website, but I gradually completed it over 2-3 months. Now, I’m enhancing it using HTML,
        CSS, JavaScript, GSAP, Locomotive Scroll.js, and ScrollTrigger.min.js. For the best experience, please view it on a laptop , with fully respnsive design.`,
    tech: ["HTML", " Tailwind CSS", "JS", "GSAP"],
    link: "https://we-think-elastic-seven.vercel.app/",
  },
  {
    title: "Cadbury Website",
    description: `I used GSAP and ScrollTrigger in this website to provide users with a smooth and engaging experience. This was my second project, so the UI/UX might not be perfect, but I always make sure to say that every website I create is designed to give users the best possible experience.`,
    tech: ["HTML", " Tailwind CSS", "JS", "GSAP"],
    link: `https://tusharthakre800.github.io/cadbury/`,
  },
  {
    title: "Significo Website",
    description: `The idea for creating this website came entirely from Significo. Their website showed me how powerful GSAP ScrollTrigger can be and the different ways it can be used. Although the website isn’t as responsive as I’d like it to be, I learned a lot while building it. Big thanks to Significo`,
    tech: ["HTML", "Tailwind CSS", "JS", "GSAP"],
    link: "https://tusharthakre800.github.io/animation/",
  },
  {
    title: "Zanjo digital studio",
    description: `This website is inspired by the concept of Zajno Digital Studio. It utilizes Three.js to create a visually stunning animation effect using pixels that transform the image in a creative way. The site is not responsive by design, as the full user experience and expressions are meant to be appreciated exclusively on desktop`,
    tech: ["HTML", "Tailwind CSS", "JS", "GSAP" ,"lenis", "Three.js"],
    link: "https://zanjo.vercel.app/",
  },
  {
    title: "realtime-collab-platform",
    description: `Real-time collaborative whiteboard platform enabling seamless drawing, chatting, and teamwork. Features instant sync, live collaboration rooms, user presence, and secure authentication. Built with React, Node.js, and Socket.io for lightning-fast interactions.`,
    tech: ["React", "express" , "tailwindcss" , "mongodb","GSAP" , "Node.js", "Socket.io"],
    link: "https://realtime-collab-platform.vercel.app/"
  },
 {
  "title": "Uber Clone - Real-time Ride Sharing Platform",
  "description": "Full-stack Uber clone with real-time ride booking, live GPS tracking, captain registration, secure authentication, and scalable backend architecture. Features instant driver matching, live location updates, payment processing, and Socket.io real-time communication for seamless ride experience.",
  "tech": ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "GSAP", "JWT", "Google Maps API", "Tailwind CSS", "PM2", ],
  "link": "https://uber-six-bice.vercel.app/"
}
];

// Animated Projects Page
const Projects = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Fade-in for container
    gsap.from(containerRef.current, {
      y: 40,
      duration: 0.2,
      ease: "power2.out",
    });

    // ScrollTrigger animation for each card
    cardsRef.current.forEach((card) => {
      card.style.opacity = 0;
      card.style.transform = "translateY(20px)";
      gsap.to(card, {
        opacity: 1,
        y: Math.floor(Math.random() * 28 - 10),
        x: Math.floor(Math.random() * 28 - 10),
        duration: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 2,
          yoyo: true,
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0f172a] via-[#181e2a] to-[#0f172a] text-white relative mb-1  ">
      {/* Animated floating gradient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-full blur-[100px] animate-float-delay"></div>
      </div>

      <div ref={containerRef} className="w-full max-w-7xl px-4 py-24">
        <h2 className="text-4xl md:text-5xl font-bold mb-14 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">
          My Projects
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <div
              key={index}
              ref={el => (cardsRef.current[index] = el)}
              className="group bg-white/10 border border-white/20 rounded-2xl shadow-xl p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-blue-400/40 backdrop-blur-md relative overflow-hidden"
            >
              {/* Shiny animation overlay using Tailwind and inline animation */}
              <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-30">
                <div
                  className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                  style={{
                    transform: "skewX(-20deg)",
                    animation: "shine-tw 1.1s linear",
                    animationPlayState: "paused"
                  }}
                  onAnimationEnd={e => (e.currentTarget.style.animationPlayState = "paused")}
                  onMouseEnter={e => (e.currentTarget.style.animationPlayState = "running")}
                />
              </div>
              {/* Gradient border effect */}
              <div className=" absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-300"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:from-blue-500 group-hover:to-pink-500 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-200 mb-4 min-h-[56px]">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-sm hover:scale-105 transition-transform duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md hover:scale-105 hover:bg-gradient-to-l transition-all duration-300"
              >
                View Live
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* Floating animation keyframes and shiny card animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px);}
            50% { transform: translateY(-30px);}
          }
          .animate-float {
            animation: float 18s ease-in-out infinite;
          }
          .animate-float-delay {
            animation: float 22s ease-in-out infinite;
            animation-delay: 0.3s;
          }
          @keyframes shine-tw {
            0% { left: -75%; }
            60% { left: 120%; }
            100% { left: 120%; }
          }
        `}
      </style>
      <Footer />
    </div>
  );
};

export default Projects;
