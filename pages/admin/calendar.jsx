import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function CalendarPage() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    async function loadBookings() {
      const response = await fetch(
        "/api/calendar-bookings"
      );

      const data =
        await response.json();

      setBookings(
        data.data || []
      );
    }

    loadBookings();
  }, []);

  const groupedBookings = {};

  bookings.forEach((booking) => {
    const date =
      booking.appointmentDate;

    if (!groupedBookings[date]) {
      groupedBookings[date] = [];
    }

    groupedBookings[date].push(
      booking
    );
  });

  return (
    <AdminLayout>

      <h1 className="mb-4">
        Booking Calendar
      </h1>

      {Object.keys(
        groupedBookings
      ).length === 0 && (
        <div className="alert alert-info">
          No bookings found
        </div>
      )}

      {Object.entries(
        groupedBookings
      ).map(
        ([date, bookings]) => (
          <div
            key={date}
            className="card shadow-sm mb-4"
          >
            <div className="card-header">
              <strong>
                {date}
              </strong>
            </div>

            <div className="card-body">

              <div className="row">

                <div className="col-md-6">

                  <div className="border rounded p-3">

                    <h6>
                      09:00 - 13:00
                    </h6>

                    {bookings.find(
                      (b) =>
                        b.appointmentSlot ===
                        "09:00-13:00"
                    ) ? (
                      <>
                        <strong>
                          {
                            bookings.find(
                              (b) =>
                                b.appointmentSlot ===
                                "09:00-13:00"
                            )
                              .requesterName
                          }
                        </strong>

                        <br />

                        {
                          bookings.find(
                            (b) =>
                              b.appointmentSlot ===
                              "09:00-13:00"
                          )
                            .requesterEmail
                        }
                      </>
                    ) : (
                      <span className="text-success">
                        Available
                      </span>
                    )}

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="border rounded p-3">

                    <h6>
                      14:00 - 18:00
                    </h6>

                    {bookings.find(
                      (b) =>
                        b.appointmentSlot ===
                        "14:00-18:00"
                    ) ? (
                      <>
                        <strong>
                          {
                            bookings.find(
                              (b) =>
                                b.appointmentSlot ===
                                "14:00-18:00"
                            )
                              .requesterName
                          }
                        </strong>

                        <br />

                        {
                          bookings.find(
                            (b) =>
                              b.appointmentSlot ===
                              "14:00-18:00"
                          )
                            .requesterEmail
                        }
                      </>
                    ) : (
                      <span className="text-success">
                        Available
                      </span>
                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>
        )
      )}

    </AdminLayout>
  );
}