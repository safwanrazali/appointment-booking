import AdminLayout from "../../../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadBookings() {
      const response = await fetch("/api/bookings");

      const data = await response.json();

      setBookings(data.data || []);
    }

    loadBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.requesterName.toLowerCase().includes(search.toLowerCase()) ||
      booking.requesterEmail.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="container py-5">
        <h1 className="mb-4">Booking List</h1>

        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Slot</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.requesterName}</td>

                      <td>{booking.appointmentDate}</td>

                      <td>{booking.appointmentSlot}</td>

                      <td>{booking.requesterEmail}</td>
                      <td>
                        <Link
                          href={`/admin/bookings/${booking._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
