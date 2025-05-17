// routes/analytics.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const moment = require("moment");
// In routes/analytics.js
const Room = require("../models/Room");


router.get("/payment-status", async (req, res) => {
  const result = await Booking.aggregate([
    { $group: { _id: "$paymentStatus", count: { $sum: 1 } } },
  ]);
  res.json(result);
});


router.get("/room-status", async (req, res) => {
  const result = await Room.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  res.json(result);
});


router.get("/daily-bookings", async (req, res) => {
  try {
    const last7Days = [...Array(7)].map((_, i) =>
      moment().subtract(i, "days").startOf("day").toDate()
    );

    const pipeline = [
      {
        $match: {
          createdAt: { $gte: moment().subtract(6, "days").startOf("day").toDate() },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ];

    const result = await Booking.aggregate(pipeline);

    // Fill in missing dates with 0
    const formatted = last7Days.reverse().map((date) => {
      const day = moment(date).format("YYYY-MM-DD");
      const entry = result.find((r) => r._id === day);
      return { date: day, count: entry?.count || 0 };
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something broke." });
  }
});

module.exports = router;
