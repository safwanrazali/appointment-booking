import AdminLayout from "../../components/admin/AdminLayout";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    async function loadBookings() {
      const response = await fetch(
        "/api/bookings"
      );

      const data =
        await response.json();

      setBookings(
        data.data || []
      );
    }

    loadBookings();
  }, []);

  return (
    <AdminLayout>
    <div className="container py-5">

      <h1 className="mb-4">
        Booking List
      </h1>

      <div className="card">
        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Slot</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>

                {bookings.map(
                  (booking) => (
                    <tr
                      key={
                        booking._id
                      }
                    >
                      <td>
                        {
                          booking.requesterName
                        }
                      </td>

                      <td>
                        {
                          booking.appointmentDate
                        }
                      </td>

                      <td>
                        {
                          booking.appointmentSlot
                        }
                      </td>

                      <td>
                        {
                          booking.requesterEmail
                        }
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

    </div>
    </AdminLayout>
  );
}