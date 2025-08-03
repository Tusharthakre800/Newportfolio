import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Main refs
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const titleCharsRef = useRef([]);
  const bioRef = useRef(null);
  const skillsRef = useRef(null);
  const skillItemsRef = useRef({});
  const timelineRef = useRef(null);
  const skillsectionRef = useRef(null);

  // State for animations
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Skills data
  const skills = [
    {
      id: "frontend",
      title: "Frontend",
      icon: "💻",
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
      description: "Creating responsive, interactive user interfaces with modern frameworks and libraries.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "GSAP" ,"Lenis"],
      proficiency: 90
    },
    {
      id: "backend",
      title: "Backend",
      icon: "⚙️",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
      description: "Building robust server-side applications and APIs to power web applications.",
      technologies: ["Node.js", "Express", "MongoDB", "RESTful APIs"],
      proficiency: 80
    },
    {
      id: "design",
      title: "Design",
      icon: "🎨",
      color: "bg-gradient-to-r from-pink-500 to-rose-500",
      description: "Creating visually appealing interfaces with focus on user experience and accessibility.",
      technologies: ["UI/UX", "Figma", "Responsive Design", "Animation"],
      proficiency: 85
    },
    {
      id: "tools",
      title: "Tools & Others",
      icon: "🛠️",
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      description: "Utilizing modern development tools and practices for efficient workflow.",
      technologies: ["Git", "VS Code", "Cody", "Argment", "Github"],
      proficiency: 88
    }
  ];

  // Timeline data
  const timelineData = [
    {
      year: "2022 - Present",
      title: "Electric maintenance technician",
      company: "Sign Post India Ltd.",
      description: "At present, I am working in the field of electrical maintenance, where I consistently put in hard work "
    },
    {
      year: "2023 - Present",
      title: "Student of Amity University",
      company: "Amity University, Noida",
      description: "Studying computer science(BCA) with focus on web technologies and software development."
    },
    {
      year: "2027",
      title: "Goal",
      company: "xxxxxxxxxx company",
      description: "My ultimate goal is to successfully transition into the IT industry by the year 2027, building a strong foundation and continuously enhancing my skills to establish a rewarding and long-term career in this field."
    }
  ];

  // Initialize animations
  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => setIsLoaded(true)
      });

      // Title animation
      if (titleRef.current && titleCharsRef.current.length > 0) {
        tl.from(titleCharsRef.current, {
          opacity: 0,
          y: 50,
          stagger: 0.03,
          duration: 0.8,
          ease: "back.out(1.7)"
        });
      }

      // Bio animation
      if (bioRef.current) {
        tl.from(bioRef.current.querySelectorAll('.bio-item'), {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4");
      }

      gsap.to(".my-expertise", {
        opacity: 1,
        duration: 0.8,
        y: -30,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".my-expertise",
          start: "top 80%",
          end: "bottom 70%",
          scrub: 5,
          yoyo: true,
          // markers: true,
          toggleActions: "play none none none"
        }
      });

      // Skills animation
      gsap.to(skillsectionRef.current, {
        opacity: 1,
        y: -50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillsectionRef.current,
          start: "top 79%",
          end: "bottom 50%",
          scrub: true,
          yoyo: true,
          // markers: true,
          toggleActions: "play none none none"
        }
      });

      // Timeline animation
      gsap.to(".journey-title", {
        opacity: 1,
        duration: 0.8,
        y: -30,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".journey-title",
          start: "top 90%",
          end: "bottom 80%",
          scrub: true,
          yoyo: true,
          // markers: true,
          toggleActions: "play none none none"
        }
      });

      if (timelineRef.current) {
        gsap.from(timelineRef.current.querySelectorAll('.timeline-item'), {
          opacity: 0,
          x: 100,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 89%",
            end: "bottom 50%",
            scrub: true,
            yoyo: true,
            // markers: true,
            toggleActions: "play none none none"
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Skill hover handler
  const handleSkillHover = (skillId, isEntering) => {
    setHoveredSkill(isEntering ? skillId : null);

    const skillCard = skillItemsRef.current[skillId];
    if (!skillCard) return;

    if (isEntering) {
      gsap.to(skillCard, {
        y: -10,
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });

      const icon = skillCard.querySelector('.skill-icon');
      gsap.to(icon, {
        scale: 1.2,
        rotate: 5,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(skillCard, {
        y: 0,
        scale: 1,
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
        duration: 0.3,
        ease: "power2.out"
      });

      const icon = skillCard.querySelector('.skill-icon');
      gsap.to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Skill click handler
  const handleSkillClick = (skillId) => {
    const isOpening = activeSkill !== skillId;
    setActiveSkill(isOpening ? skillId : null);

    const skillCard = skillItemsRef.current[skillId];
    if (!skillCard) return;

    const detailElement = skillCard.querySelector('.skill-detail');
    if (!detailElement) return;

    const techElements = skillCard.querySelectorAll('.tech-item');
    const tl = gsap.timeline();

    if (isOpening) {
      tl.to(detailElement, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut"
      });

      tl.from(techElements, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, "-=0.2");

      const progressBar = skillCard.querySelector('.progress-fill');
      const progressValue = skillCard.querySelector('.progress-value');
      const proficiency = skills.find(s => s.id === skillId)?.proficiency || 0;

      if (progressBar && progressValue) {
        tl.fromTo(progressBar,
          { width: "0%" },
          {
            width: `${proficiency}%`,
            duration: 1,
            ease: "power2.out"
          },
          "-=0.3"
        );

        tl.fromTo(progressValue,
          { textContent: "0%" },
          {
            textContent: `${proficiency}%`,
            duration: 1,
            ease: "power2.out",
            snap: { textContent: 1 }
          },
          "-=1"
        );
      }
    } else {
      tl.to(detailElement, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  };

  // Title text animation setup
  const titleText = "About Me";
  const titleChars = titleText.split('').map((char, index) => (
    <span
      key={index}
      ref={el => {
        if (el && !titleCharsRef.current.includes(el)) {
          titleCharsRef.current[index] = el;
        }
      }}
      className="inline-block"
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-white overflow-hidden pt-16">
      {/* Background animations */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-teal-500/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 md:py-28">
        {/* Hero section */}
        <div className="mb-20 md:mb-32">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {titleChars}
          </h1>

          <div ref={bioRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Bio content */}
            <div className="md:col-span-7 space-y-6">
              <p className="bio-item text-xl md:text-2xl font-light leading-relaxed">
                I'm <span className="font-semibold text-blue-400 hover-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-[length:200%_100%] hover-text animate-pulse">Tushar Thakre</span>, a passionate
                <span className="relative inline-block px-2 hover-text">
                  <span className="relative z-10 font-semibold animate-pulse">developer</span>
                </span>
                with a love for creating beautiful, interactive web experiences.
              </p>

              <p className="bio-item text-gray-300 leading-relaxed hover-text">
                With expertise in modern frontend technologies and a keen eye for design,
                I transform ideas into engaging digital experiences that leave a lasting impression.
              </p>
            </div>

            {/* Stats */}
            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bio-item p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-blue-400 mb-2 hover-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-[length:200%_100%]">1+</span>
                  <span className="text-sm text-gray-400 hover-text">Years Experience</span>
                </div>
                <div className="bio-item p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">5+</span>
                  <span className="text-sm text-gray-400">Projects</span>
                </div>
                
                <div className="bio-item p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">6+</span>
                  <span className="text-sm text-gray-400">Technologies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills section */}
        <div ref={skillsRef} className="mb-20 md:mb-32 scroll-section">
          <h2 className="my-expertise text-3xl md:text-4xl font-bold mb-12 relative inline-block overflow-hidden opacity-0">
            <span className="block pb-2">
              My Expertise
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 timeline-connector"></span>
            </span>
          </h2>

          <div ref={skillsectionRef} className="  grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 opacity-0 ">
            {skills.map((skill) => (
              <div
                key={skill.id}
                ref={el => skillItemsRef.current[skill.id] = el}
                className={`rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                  activeSkill === skill.id ? 'ring-2 ring-blue-500 bg-white/10' : 'bg-white/5'
                }`}
                onMouseEnter={() => handleSkillHover(skill.id, true)}
                onMouseLeave={() => handleSkillHover(skill.id, false)}
                onClick={() => handleSkillClick(skill.id)}
              >
                <div className={`p-6 flex items-center justify-between ${skill.color} relative overflow-hidden group cursor-pointer`}>
                  <div className="flex items-center">
                    <span className="skill-icon text-3xl mr-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3">{skill.icon}</span>
                    <h3 className="text-xl font-semibold">{skill.title}</h3>
                  </div>

                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full bg-white/30 opacity-0 scale-0 ${
                          hoveredSkill === skill.id ? 'animate-particle' : ''
                        }`}
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `${1 + Math.random() * 2}s`
                        }}
                      ></div>
                    ))}
                  </div>

                  <div className={`transition-transform duration-300 ${activeSkill === skill.id ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div
                  className={`skill-detail bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300`}
                  style={{ height: activeSkill === skill.id ? 'auto' : '0', opacity: activeSkill === skill.id ? 1 : 0 }}
                >
                  <div className="p-6">
                    <p className="text-gray-300 mb-6">{skill.description}</p>

                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-blue-300">Proficiency</span>
                        <span className="text-sm font-medium text-blue-300 progress-value">0%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="progress-fill h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '0%' }}></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="tech-item px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors duration-300 hover:scale-110 transform"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline section */}
        <div className="mb-20 md:mb-32">
          <h2  className="journey-title text-3xl md:text-4xl font-bold mb-12 relative inline-block overflow-hidden opacity-0">
            My Journey
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 timeline-connector"></span>
            </h2>

          <div ref={timelineRef} className="relative border-l-2 border-gray-700 pl-6 ml-3 md:ml-6 space-y-10">
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item relative">
                <div className="absolute -left-[31px] w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-x-1">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-blue-400 mb-3">{item.company}</p>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mb-20 md:mb-32 ">
          <div className="rounded-3xl overflow-hidden relative hover:shadow-2xl transition-shadow duration-500 bg-[#1C2435]">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 backdrop-blur-sm -z-10"></div>

            <div className="p-8 md:p-12 text-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Have a project in mind or looking to explore potential opportunities? I’m always open to exciting new challenges and meaningful collaborations that inspire growth and innovation.              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <NavLink
                to="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 transform"
              >
                Get in Touch
              </NavLink>
              <a
                href="/tushar.pdf"
                download="tushar resume 1.pdf"
                className=" inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 transform"
              >
                Download Resume
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes particle {
            0% { opacity: 0; transform: scale(0) translateY(0); }
            50% { opacity: 0.8; transform: scale(1) translateY(-20px); }
            100% { opacity: 0; transform: scale(0) translateY(-40px); }
          }

          .animate-particle {
            animation: particle 2s infinite;
          }
        `}
      </style>

      <Footer />
    </div>
  );
};

export default About;

