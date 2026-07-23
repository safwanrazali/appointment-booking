import { connectDB } from "../../../lib/mongodb";
import Booking from "../../../models/Booking";
import Holiday from "../../../models/Holiday";

export default async function handler(req, res) {
  await connectDB();

  const { date } = req.query;

  if (!date) {
    return res.status(400).json({
      success: false,
      message: "Date is required",
    });
  }

  const bookingDate = new Date(date);

  const now = new Date();

  const oneYearLater = new Date();

  oneYearLater.setFullYear(
    oneYearLater.getFullYear() + 1
  );

  if (
    bookingDate < now ||
    bookingDate > oneYearLater
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Booking date is outside allowed range",
    });
  }

  const day = bookingDate.getDay();

  if (day === 0 || day === 6) {
    return res.status(200).json({
      success: true,
      availableSlots: [],
      message: "Weekend",
    });
  }

  const holiday =
    await Holiday.findOne({
      date,
    });

  if (holiday) {
    return res.status(200).json({
      success: true,
      availableSlots: [],
      message: "Public Holiday",
    });
  }

  const bookings =
    await Booking.find({
      appointmentDate: date,
    });

  const allSlots = [
    "09:00-13:00",
    "14:00-18:00",
  ];

  const bookedSlots =
    bookings.map(
      (booking) =>
        booking.appointmentSlot
    );

  let availableSlots =
    allSlots.filter(
      (slot) =>
        !bookedSlots.includes(slot)
    );

  // =====================
  // MINIMUM 24 HOURS RULE
  // =====================

  const selectedDateOnly =
    bookingDate.toISOString().split("T")[0];

  const todayOnly =
    new Date().toISOString().split("T")[0];

  const tomorrow = new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const tomorrowOnly =
    tomorrow.toISOString().split("T")[0];

  if (
    selectedDateOnly ===
    tomorrowOnly
  ) {
    const nowPlus24Hours =
      new Date(
        Date.now() +
          24 * 60 * 60 * 1000
      );

    const hour =
      nowPlus24Hours.getHours();

    if (hour >= 13) {
      availableSlots = [];
    } else {
      availableSlots =
        availableSlots.filter(
          (slot) =>
            slot ===
            "14:00-18:00"
        );
    }
  }

  if (
    selectedDateOnly ===
    todayOnly
  ) {
    availableSlots = [];
  }

  return res.status(200).json({
    success: true,
    availableSlots,
  });
}