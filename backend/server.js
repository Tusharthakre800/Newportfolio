// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// require("dotenv").config();



// const app = express();

// const corsOptions = {
//   origin: process.env.VITE_API_BASE, 
//   // Update with your frontend URL

//   optionsSuccessStatus: 200,
//   credentials: true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
// };
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // Enable pre-flight requests for all routes 

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const feedbackRoutes = require("./routes/feedbackRoutes");
// const feedbackController = require("./controllers/feedbackController");
// const authenticateAdmin = require("./routes/adminAuth");


// mongoose.connect(
//     process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));


// // Routes
// // app.get("/", (req, res) => {
// //   res.send("Welcome to the Feedback API");
// // });
// app.use("/api/feedback", feedbackRoutes);
// app.use("/admin-auth", authenticateAdmin);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS setup for your frontend
const corsOptions = {
  origin: process.env.VITE_API_BASE, // Your frontend URL
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Pre-flight support

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const feedbackRoutes = require("./routes/feedbackRoutes");
const authenticateAdmin = require("./routes/adminAuth");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/feedback", feedbackRoutes);
app.use("/admin-auth", authenticateAdmin);

// Server start
const PORT = process.env.PORT || 5000; // Render will set process.env.PORT
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
