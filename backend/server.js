const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

const allowedOrigins = ["https://www.tusharwebdev.online"];

const corsOptions = {
  origin: `https://www.tusharwebdev.online`, // Update with your frontend URL
  optionsSuccessStatus: 200,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from Postman or curl where origin might be undefined
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: origin not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const feedbackRoutes = require("./routes/feedbackRoutes");
const feedbackController = require("./controllers/feedbackController");
const authenticateAdmin = require("./routes/adminAuth");


mongoose.connect(
    process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));


app.use("/api/feedback", feedbackRoutes);
app.use("/admin-auth", authenticateAdmin);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
