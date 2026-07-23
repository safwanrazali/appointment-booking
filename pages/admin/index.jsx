import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch("/api/dashboard");

        const data = await response.json();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();
  }, []);

  if (!stats) {
    return (
      <AdminLayout>
        <div className="container py-5">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="mb-4">
          <h2 className="fw-bold">Dashboard</h2>

          <p className="text-muted">PTPKM Appointment Booking Platform</p>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-xl-3">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <h6 className="text-muted">Total Bookings</h6>

                <h2 className="fw-bold">{stats.totalBookings}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <h6 className="text-muted">This Month</h6>

                <h2 className="fw-bold">{stats.monthlyBookings}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <h6 className="text-muted">Upcoming</h6>

                <h2 className="fw-bold">{stats.upcomingBookings}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <h6 className="text-muted">Public Holidays</h6>

                <h2 className="fw-bold">{stats.totalHolidays}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-5 border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">System Information</h5>

            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Working Hours:</strong>
                  <br />
                  9:00 AM - 6:00 PM
                </p>
              </div>

              <div className="col-md-6">
                <p>
                  <strong>Available Slots:</strong>
                  <br />
                  09:00 - 13:00
                  <br />
                  14:00 - 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
