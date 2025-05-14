const Maintenance = require("../models/Maintenance");

// ✅ Report a Maintenance Issue
exports.reportIssue = async (req, res) => {
  try {
    const { user, room, issueDescription, status } = req.body;
    const newIssue = new Maintenance({ user, room, issueDescription, status: status || "Pending" });
    await newIssue.save();
    res.status(201).json({ message: "Maintenance issue reported successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Maintenance Requests
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Maintenance.find().populate("user room");
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Maintenance Issue Status (e.g., "In Progress", "Resolved")
exports.updateIssueStatus = async (req, res) => {
  try {
    const updatedIssue = await Maintenance.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a Maintenance Issue (If Admin Wants to Remove Old Records)
exports.deleteIssue = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.json({ message: "Maintenance issue deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};