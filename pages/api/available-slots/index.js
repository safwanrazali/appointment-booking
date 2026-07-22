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

  const day = bookingDate.getDay();

  // Sunday = 0
  // Saturday = 6

  if (day === 0 || day === 6) {
    return res.status(200).json({
      success: true,
      availableSlots: [],
      message: "Weekend",
    });
  }

  const holiday = await Holiday.findOne({
    date,
  });

  if (holiday) {
    return res.status(200).json({
      success: true,
      availableSlots: [],
      message: "Public Holiday",
    });
  }

  const bookings = await Booking.find({
    appointmentDate: date,
  });

  const allSlots = ["09:00-13:00", "14:00-18:00"];

  const bookedSlots = bookings.map((booking) => booking.appointmentSlot);

  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  return res.status(200).json({
    success: true,
    availableSlots,
  });
}
