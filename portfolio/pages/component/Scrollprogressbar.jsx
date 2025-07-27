// src/pages/component/ScrollProgress.jsx
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({ smooth: true });

    function updateProgress() {
      const scrollTop = lenis.scroll;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setProgress(scrollPercent);
    }

    function raf(time) {
      lenis.raf(time);
      updateProgress();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999]">
      <div
        className="h-full bg-blue-500 transition-all duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ScrollProgress;
