import AdminLayout from "../../../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await fetch("/api/bookings");

        const data = await response.json();

        setBookings(data.data || []);
      } catch (error) {
        console.error(error);
      }
    }

    loadBookings();
  }, []);

  const filteredBookings = bookings
    .filter((booking) => {
      const searchTerm = search.toLowerCase();

      const bookingDate = booking.appointmentDate?.toString().split("T")[0];

      const matchesSearch =
        booking.requesterName?.toLowerCase().includes(searchTerm) ||
        booking.requesterEmail?.toLowerCase().includes(searchTerm) ||
        booking.referenceNo?.toLowerCase().includes(searchTerm);

      const matchesDate = !selectedDate || bookingDate === selectedDate;

      return matchesSearch && matchesDate;
    })
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  const resetFilters = () => {
    setSearch("");
    setSelectedDate("");
  };

  return (
    <AdminLayout>
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Booking List</h1>

          <span className="badge bg-primary fs-6">
            {filteredBookings.length} Record(s)
          </span>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="row g-3 mb-4">
              <div className="col-lg-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Name, Email or Reference No..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="col-lg-3">
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="col-lg-3">
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Reference No</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Slot</th>
                    <th>Email</th>
                    <th width="120">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.referenceNo || "-"}</td>

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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        No booking found
                      </td>
                    </tr>
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
