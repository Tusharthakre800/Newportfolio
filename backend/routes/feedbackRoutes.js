const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const authenticateAdmin = require("../middleware/auth");
// Create
router.post("/", async (req, res) => {
  const { name, message } = req.body;
  const feedback = new Feedback({ name, message });
  await feedback.save();
  res.status(201).json(feedback);
});

// Read all
router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

// Like
router.patch("/like/:id", async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) return res.status(404).json({ error: "Not found" });
  feedback.likes += 1;
  await feedback.save();
  res.json(feedback);
});




// Delete feedback (protected)
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const deleted = await Feedback.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted" });
});


module.exports = router;
