import "./App.css";
import Navbar from "../pages/Navbar";
import Home from "../pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Project from "../pages/Project";
import Contact from "../pages/Contact";
import ProjectVideos from "../pages/ProjectVideos"; // Updated import to match the new file name
import Footer from "../pages/Footer";
import CubeLoader from "../pages/CubeLoader";
import Customcursor from "../pages/Customcursor";
import Scrollprogress from "../pages/component/Scrollprogress";
import PageTransition from "../pages/component/PageTransition";
import Error404 from "../pages/Error404";
import { useState } from "react";
import ChatBot from "../pages/ChatBot"; // Importing ChatBot component

function App() {
  // Always show loader on page refresh
  const [loading, setLoading] = useState(true);

  if (loading) return <CubeLoader setLoading={setLoading} />;
  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 min-h-screen">
      <PageTransition />
      <Navbar />
      <div className="main-content w-full flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/error" element={<Error404 />} />
          <Route path="/project-videos" element={<ProjectVideos />} />
          <Route path="/chatbot" element={<ChatBot />} /> {/* Adding ChatBot route */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      <Scrollprogress />
      <Customcursor />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
