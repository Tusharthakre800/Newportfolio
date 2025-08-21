const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }, // bcrypt hash
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
