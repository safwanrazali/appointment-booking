import { connectDB } from "../../../lib/mongodb";
import Booking from "../../../models/Booking";
import Holiday from "../../../models/Holiday";

export default async function handler(req, res) {
  await connectDB();

  // =========================
  // CREATE BOOKING
  // =========================
  if (req.method === "POST") {
    try {
      const {
        requesterName,
        requesterEmail,
        requesterPhone,
        appointmentDate,
        appointmentSlot,
        purpose,
      } = req.body;

      // Validate required fields
      if (
        !requesterName ||
        !requesterEmail ||
        !requesterPhone ||
        !appointmentDate ||
        !appointmentSlot ||
        !purpose
      ) {
        return res.status(400).json({
          success: false,
          message: "Please fill in all required fields",
        });
      }

      // Check weekend
      const selectedDate = new Date(appointmentDate);
      const day = selectedDate.getDay();

      // Sunday = 0, Saturday = 6
      if (day === 0 || day === 6) {
        return res.status(400).json({
          success: false,
          message: "Booking is not allowed on weekends",
        });
      }

      // Check public holiday
      const holiday = await Holiday.findOne({
        date: appointmentDate,
      });

      if (holiday) {
        return res.status(400).json({
          success: false,
          message: "Selected date is a public holiday",
        });
      }

      // Check slot availability
      const existingBooking = await Booking.findOne({
        appointmentDate,
        appointmentSlot,
      });

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: "Selected slot already booked",
        });
      }

      // Generate Reference Number
      const totalBookings = await Booking.countDocuments();

      const referenceNo = `MPQ-${new Date().getFullYear()}-${String(
        totalBookings + 1,
      ).padStart(4, "0")}`;

      // Create booking
      const booking = await Booking.create({
        referenceNo,
        requesterName,
        requesterEmail,
        requesterPhone,
        appointmentDate,
        appointmentSlot,
        purpose,
      });

      return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // =========================
  // GET ALL BOOKINGS
  // =========================
  if (req.method === "GET") {
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

  // =========================
  // METHOD NOT ALLOWED
  // =========================
  return res.status(405).json({
    success: false,
    message: "Method Not Allowed",
  });
}
