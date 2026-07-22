import { connectDB } from "../../lib/mongodb";
import Booking from "../../models/Booking";

export default async function handler(req, res) {
  await connectDB();

  try {
    const bookings = await Booking.find().sort({
      appointmentDate: 1,
    });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
