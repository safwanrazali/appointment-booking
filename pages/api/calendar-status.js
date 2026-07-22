import { connectDB } from "../../lib/mongodb";
import Booking from "../../models/Booking";
import Holiday from "../../models/Holiday";

export default async function handler(req, res) {
  await connectDB();

  try {
    const holidays = await Holiday.find();

    const bookings = await Booking.find();

    const fullyBookedDates = [];

    const groupedBookings = {};

    bookings.forEach((booking) => {
      const date = booking.appointmentDate;

      if (!groupedBookings[date]) {
        groupedBookings[date] = 0;
      }

      groupedBookings[date]++;
    });

    Object.keys(groupedBookings).forEach((date) => {
      if (groupedBookings[date] >= 2) {
        fullyBookedDates.push(date);
      }
    });

    return res.status(200).json({
      success: true,
      holidays: holidays.map((holiday) => holiday.date),
      fullyBookedDates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
