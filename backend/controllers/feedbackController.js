const Feedback = require('../models/Feedback');

// Like or Dislike feedback
exports.toggleFeedbackReaction = async (req, res) => {
  const { id } = req.params; // feedback ID
  const { userId, action } = req.body; // userId and action: "like" or "dislike"

  try {
    const feedback = await Feedback.findById(id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });

    const hasLiked = feedback.likes.includes(userId);
    const hasDisliked = feedback.dislikes.includes(userId);

    if (action === "like") {
      // Remove dislike if exists
      if (hasDisliked) {
        feedback.dislikes.pull(userId);
      }
      // Toggle like
      if (hasLiked) {
        feedback.likes.pull(userId);
      } else {
        feedback.likes.push(userId);
      }
    } else if (action === "dislike") {
      // Remove like if exists
      if (hasLiked) {
        feedback.likes.pull(userId);
      }
      // Toggle dislike
      if (hasDisliked) {
        feedback.dislikes.pull(userId);
      } else {
        feedback.dislikes.push(userId);
      }
    }

    await feedback.save();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
