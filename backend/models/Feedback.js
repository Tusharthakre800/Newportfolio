const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: String,
    message: String,
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Feedback", feedbackSchema);
