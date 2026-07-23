import { connectDB } from "../../../lib/mongodb";
import Booking from "../../../models/Booking";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  // GET BOOKING DETAILS
  if (req.method === "GET") {
    try {
      const booking = await Booking.findById(id);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // DELETE BOOKING
  if (req.method === "DELETE") {
    try {
      await Booking.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Booking deleted",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Method Not Allowed",
  });
}
