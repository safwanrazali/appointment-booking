import { connectDB } from "../../lib/mongodb";
import Booking from "../../models/Booking";
import Holiday from "../../models/Holiday";

export default async function handler(req, res) {
  await connectDB();

  try {
    const totalBookings = await Booking.countDocuments();

    const totalHolidays = await Holiday.countDocuments();

    const today = new Date();

    const currentMonth = today.getMonth() + 1;

    const currentYear = today.getFullYear();

    const bookings = await Booking.find();

    const monthlyBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.appointmentDate);

      return (
        bookingDate.getMonth() + 1 === currentMonth &&
        bookingDate.getFullYear() === currentYear
      );
    });

    const upcomingBookings = bookings.filter((booking) => {
      return new Date(booking.appointmentDate) >= today;
    });

    return res.status(200).json({
      success: true,

      totalBookings,

      totalHolidays,

      monthlyBookings: monthlyBookings.length,

      upcomingBookings: upcomingBookings.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
