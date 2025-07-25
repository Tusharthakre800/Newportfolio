import React from "react";    


const projectVideos = [
  {
    title: "Sign post india",
    video: "/signpost india.mp4",
    thumbnail: "/Sign post india.png",
  },
  {
    title: "Notepad Application",
    video: "/notepad.mp4",
    thumbnail: "/notepad.png",
  },
  {
    title: "Hotel Website",
    video: "/Hotel.mp4",
    thumbnail: "/Hotel.png",
  },
  {
    title: "WE THINKE LASTIC",
    video: "/we thinks.mp4",
    thumbnail: "/we thinks.png",
  },
  {
    title: "catbury website",
    video: "/catbury.mp4",
    thumbnail: "/catbury.png",
  },
  {
    title: "zanjo digital studio",
    video: "/zanjo.mp4",
    thumbnail: "/zanjo.png",
  },
];

const ProjectVideos = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-2">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">
        Project Videos
      </h1>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectVideos.map((project, idx) => (
          <div key={idx} className="bg-[#181e2a] rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.03] transition-transform duration-200">
            <div className="relative group cursor-pointer">
              <video
                src={project.video}
                poster={project.thumbnail}
                className="w-full aspect-video object-cover bg-black"
                controls
                preload="none"
                style={{ borderRadius: '0.75rem 0.75rem 0 0' }}
              />
              <div className="absolute left-2 bottom-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {project.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectVideos;
