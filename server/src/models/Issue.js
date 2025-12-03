const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
});

module.exports = mongoose.model("Issue", issueSchema);
