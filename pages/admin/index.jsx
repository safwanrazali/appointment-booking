import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const response = await fetch(
        "/api/dashboard"
      );

      const data =
        await response.json();

      setStats(data);
    }

    loadDashboard();
  }, []);

  if (!stats) {
    return (
      <div className="container py-5">
        Loading...
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className="container py-5">

      <h1 className="mb-4">
        Dashboard
      </h1>

      <div className="row">

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>
                {
                  stats.totalBookings
                }
              </h3>
              <p>
                Total Bookings
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>
                {
                  stats.monthlyBookings
                }
              </h3>
              <p>
                This Month
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>
                {
                  stats.upcomingBookings
                }
              </h3>
              <p>
                Upcoming
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>
                {
                  stats.totalHolidays
                }
              </h3>
              <p>
                Public Holidays
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
    </AdminLayout>
  );
}