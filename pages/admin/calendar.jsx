import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function CalendarPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await fetch("/api/calendar-bookings");

        const data = await response.json();

        setBookings(data.data || []);
      } catch (error) {
        console.error(error);
      }
    }

    loadBookings();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const groupedBookings = {};

  bookings.forEach((booking) => {
    const date = booking.appointmentDate;

    if (!groupedBookings[date]) {
      groupedBookings[date] = [];
    }

    groupedBookings[date].push(booking);
  });

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h2 className="mb-4 fw-bold">Booking Calendar</h2>

        {Object.keys(groupedBookings).length === 0 && (
          <div className="alert alert-info">No bookings found</div>
        )}

        {Object.entries(groupedBookings).map(([date, dayBookings]) => {
          const morningBooking = dayBookings.find(
            (b) => b.appointmentSlot === "09:00-13:00",
          );

          const afternoonBooking = dayBookings.find(
            (b) => b.appointmentSlot === "14:00-18:00",
          );

          return (
            <div key={date} className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-white">
                <strong>{formatDate(date)}</strong>
              </div>

              <div className="card-body">
                <div className="row g-3">
                  {/* Morning Slot */}
                  <div className="col-md-6">
                    <div className="border rounded p-3 h-100">
                      <h6 className="fw-bold">09:00 - 13:00</h6>

                      {morningBooking ? (
                        <>
                          <div className="fw-semibold">
                            {morningBooking.requesterName}
                          </div>

                          <small className="text-muted">
                            {morningBooking.requesterEmail}
                          </small>

                          <br />

                          <span className="badge bg-danger mt-2">Occupied</span>
                        </>
                      ) : (
                        <span className="badge bg-success">Available</span>
                      )}
                    </div>
                  </div>

                  {/* Afternoon Slot */}
                  <div className="col-md-6">
                    <div className="border rounded p-3 h-100">
                      <h6 className="fw-bold">14:00 - 18:00</h6>

                      {afternoonBooking ? (
                        <>
                          <div className="fw-semibold">
                            {afternoonBooking.requesterName}
                          </div>

                          <small className="text-muted">
                            {afternoonBooking.requesterEmail}
                          </small>

                          <br />

                          <span className="badge bg-danger mt-2">Occupied</span>
                        </>
                      ) : (
                        <span className="badge bg-success">Available</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
