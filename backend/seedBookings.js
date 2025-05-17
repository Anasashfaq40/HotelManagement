// seedBookings.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Booking = require("./models/Booking"); // adjust if your path is different
const User = require("./models/User");
const Room = require("./models/Room");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

const seedBookings = async () => {
  try {
    const user = await User.findOne();
    const room = await Room.findOne();

    if (!user || !room) {
      console.log("Need at least one user and one room in DB.");
      return;
    }

    await Booking.deleteMany(); // clean existing bookings

    const today = new Date();

    const fakeBookings = [...Array(7)].map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      return {
        user: user._id,
        room: room._id,
        checkInDate: new Date(date),
        checkOutDate: new Date(date.getTime() + 24 * 60 * 60 * 1000),
        adults: 2,
        children: 0,
        staffName: "SeederBot",
        status: "confirmed",
        roomCharges: 100,
        serviceCharges: 20,
        taxAmount: 12,
        totalAmount: 132,
        paymentStatus: "paid",
        createdAt: date,
        updatedAt: date,
      };
    });

    await Booking.insertMany(fakeBookings);
    console.log("🔥 Bookings seeded!");
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    mongoose.disconnect();
  }
};

seedBookings();
