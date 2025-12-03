const Issue = require("../models/Issue");

const categories = [
  "Battery",
  "Brakes",
  "Tyres",
  "Engine",
  "Electrical",
  "Other"
];

async function listIssueCategories(req, res) {
  res.json(categories);
}

async function submitIssue(req, res) {
  try {
    const { userId, category, description } = req.body;
    if (!userId || !category || !description) {
      return res.status(400).json({ error: "userId, category, and description are required" });
    }
    const issue = await Issue.create({ userId, category, description });
    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listIssueCategories, submitIssue };
