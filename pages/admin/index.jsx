import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const STAT_CARDS = [
  {
    key: "totalBookings",
    label: "Total Bookings",
    icon: "bi-journal-check",
    accent: "",
  },
  {
    key: "monthlyBookings",
    label: "This Month",
    icon: "bi-calendar-week",
    accent: "accent-indigo",
  },
  {
    key: "upcomingBookings",
    label: "Upcoming",
    icon: "bi-hourglass-split",
    accent: "accent-success",
  },
  {
    key: "totalHolidays",
    label: "Public Holidays",
    icon: "bi-sun",
    accent: "accent-warning",
  },
];

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
          {STAT_CARDS.map((stat) => (
            <div className="col-md-6 col-xl-3" key={stat.key}>
              <div className={`card dashboard-card h-100 ${stat.accent}`}>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="text-muted mb-0">{stat.label}</h6>
                    <i className={`bi ${stat.icon} text-muted`} />
                  </div>

                  <h2 className="fw-bold mb-0">{stats[stat.key]}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card mt-5 border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">
              <i className="bi bi-info-circle me-2" />
              System Information
            </h5>

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
