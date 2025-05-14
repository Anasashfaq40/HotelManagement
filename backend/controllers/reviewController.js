const Review = require("../models/Review");

// ✅ Add a Review
exports.addReview = async (req, res) => {
  try {
    const { user, room, rating, comment } = req.body;
    const newReview = new Review({ user, room, rating, comment });
    await newReview.save();
    res.status(201).json({ message: "Review added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user room");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};