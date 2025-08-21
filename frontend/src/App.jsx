

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages & Components
import Navbar from "../pages/Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Project from "../pages/Project";
import Contact from "../pages/Contact";
import ProjectVideos from "../pages/ProjectVideos";
import Footer from "../pages/Footer";
import CubeLoader from "../pages/CubeLoader";
import Customcursor from "../pages/Customcursor";
import Scrollprogress from "../pages/component/Scrollprogress";
import PageTransition from "../pages/component/PageTransition";
import Error404 from "../pages/Error404";
import ChatBot from "../pages/ChatBot";
import FeedbackForm from "../pages/component/FeedbackForm";
import FeedbackDisplay from "../pages/component/FeedbackDisplay";
import AdminFeedbacks from "../pages/AdminFeedback";
import AdminLogin from "../pages/AdminLogin";
import AdminFeedback from "../pages/AdminFeedback";

import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  const PrivateAdminRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  if (!token) return <Navigate to="/admin-login" replace />;
  return children;
};

  // Fetch feedbacks from backend
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/feedback`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

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
          <Route path="/project-videos" element={<ProjectVideos />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route
            path="/feedback"
            element={
              <>
                <FeedbackForm onFeedbackSubmit={fetchFeedbacks} />
                {/* <FeedbackDisplay feedbacks={feedbacks} onLike={fetchFeedbacks} /> */}
              </>
            }
          />
          <Route
            path="/admin-feedback"
            element={<AdminFeedbacks refresh={fetchFeedbacks} />}
          />
          <Route
          path="/admin-feedback"
          element={
            <PrivateAdminRoute>
              <AdminFeedback />
            </PrivateAdminRoute>
          }
        />
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
