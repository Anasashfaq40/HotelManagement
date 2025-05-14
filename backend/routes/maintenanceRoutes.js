const express = require("express");
const router = express.Router();
const Issue = require('../models/Issue');


router.post("/", async (req, res) => {
    try {
      const { userId, roomNumber, issue } = req.body;
  
      if (!userId || !roomNumber || !issue) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newIssue = new Issue({
        userId,
        roomNumber,
        issue,
      });
  
      await newIssue.save();
  
      res.status(201).json({ message: "Issue reported successfully", issue: newIssue });
    } catch (error) {
      console.error("Error saving issue:", error);
      res.status(500).json({ message: "Server error while reporting issue" });
    }
  });


  router.get("/", async (req, res) => {
    try {
      const issues = await Issue.find().populate("userId", "name email"); // Optional: populate user info
      res.status(200).json(issues);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch issues" });
    }
  });
  

module.exports = router;