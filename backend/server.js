const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();



const app = express();

const corsOptions = {
  origin: "https://www.tusharwebdev.online",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  }
);
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
