import Link from "next/link";

export default function AdminLayout({ children }) {
  const logout = async () => {
    await fetch("/api/admin/logout");

    window.location.href = "/admin/login";
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-lg-2 admin-sidebar">
          <div className="p-4">
            <div className="admin-logo mb-4">
              <div className="fs-4 fw-bold">PTPKM</div>

              <small className="text-light opacity-75">
                Appointment Booking
              </small>
            </div>

            <hr className="border-light opacity-25" />

            <nav>
              <Link href="/admin" className="admin-menu">
                📊 Dashboard
              </Link>

              <Link href="/admin/bookings" className="admin-menu">
                📅 Bookings
              </Link>

              <Link href="/admin/calendar" className="admin-menu">
                🗓 Calendar
              </Link>

              <Link href="/admin/holidays" className="admin-menu">
                🏖 Holidays
              </Link>
            </nav>

            <div className="mt-5">
              <button onClick={logout} className="btn btn-warning w-100">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="col-lg-10">
          <div className="p-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h4 className="mb-0">PTPKM Appointment Booking Platform</h4>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
