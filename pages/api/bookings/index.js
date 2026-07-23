import { connectDB } from "../../../lib/mongodb";
import Booking from "../../../models/Booking";
import Holiday from "../../../models/Holiday";
import { sendBookingNotification } from "../../../lib/email";

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

      // =========================
      // REQUIRED FIELDS
      // =========================

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

      const selectedDate = new Date(appointmentDate);

      // =========================
      // MAX 1 YEAR VALIDATION
      // =========================

      const oneYearLater = new Date();

      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

      if (selectedDate > oneYearLater) {
        return res.status(400).json({
          success: false,
          message: "Booking can only be made within 1 year",
        });
      }

      // =========================
      // MINIMUM 24 HOURS VALIDATION
      // =========================

      const now = new Date();

      const bookingDateTime = new Date(appointmentDate);

      if (appointmentSlot === "09:00-13:00") {
        bookingDateTime.setHours(9, 0, 0, 0);
      } else {
        bookingDateTime.setHours(14, 0, 0, 0);
      }

      const diffHours = (bookingDateTime - now) / (1000 * 60 * 60);

      if (diffHours < 24) {
        return res.status(400).json({
          success: false,
          message: "Booking must be made at least 24 hours in advance",
        });
      }

      // =========================
      // WEEKEND VALIDATION
      // =========================

      const day = selectedDate.getDay();

      if (day === 0 || day === 6) {
        return res.status(400).json({
          success: false,
          message: "Booking is not allowed on weekends",
        });
      }

      // =========================
      // HOLIDAY VALIDATION
      // =========================

      const holiday = await Holiday.findOne({
        date: appointmentDate,
      });

      if (holiday) {
        return res.status(400).json({
          success: false,
          message: "Selected date is a public holiday",
        });
      }

      // =========================
      // SLOT VALIDATION
      // =========================

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

      // =========================
      // GENERATE REFERENCE NUMBER
      // =========================

      const totalBookings = await Booking.countDocuments();

      const referenceNo = `MPQ-${new Date().getFullYear()}-${String(
        totalBookings + 1,
      ).padStart(4, "0")}`;

      // =========================
      // CREATE BOOKING
      // =========================

      const booking = await Booking.create({
        referenceNo,
        requesterName,
        requesterEmail,
        requesterPhone,
        appointmentDate,
        appointmentSlot,
        purpose,
      });

      // =========================
      // SEND EMAIL
      // =========================

      await sendBookingNotification(booking);

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
