import Link from "next/link";

export default function AdminLayout({ children }) {
  const logout = async () => {
    await fetch("/api/admin/logout");

    window.location.href = "/admin/login";
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 bg-dark min-vh-100 p-0">
          <div className="p-4 text-white">
            <h4>MPQ Booking</h4>

            <hr />

            <div className="d-grid gap-2">
              <Link href="/admin" className="btn btn-outline-light text-start">
                Dashboard
              </Link>

              <Link
                href="/admin/calendar"
                className="btn btn-outline-light text-start"
              >
                Calendar
              </Link>

              <Link
                href="/admin/bookings"
                className="btn btn-outline-light text-start"
              >
                Bookings
              </Link>

              <Link
                href="/admin/holidays"
                className="btn btn-outline-light text-start"
              >
                Holidays
              </Link>
            </div>

            <hr />
            <button onClick={logout} className="btn btn-danger text-start">
              Logout
            </button>
          </div>
        </div>

        <div className="col-md-9 col-lg-10 p-4">{children}</div>
      </div>
    </div>
  );
}
