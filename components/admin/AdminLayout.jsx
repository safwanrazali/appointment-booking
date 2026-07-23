import Link from "next/link";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "bi-speedometer2", exact: true },
  { href: "/admin/bookings", label: "Bookings", icon: "bi-journal-check" },
  { href: "/admin/calendar", label: "Calendar", icon: "bi-calendar3-week" },
  { href: "/admin/holidays", label: "Holidays", icon: "bi-sun" },
];

export default function AdminLayout({ children }) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout");

    window.location.href = "/";
  };

  const isActive = (item) =>
    item.exact
      ? router.pathname === item.href
      : router.pathname.startsWith(item.href);

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-lg-2 admin-sidebar">
          <div className="p-4">
            <div className="admin-logo mb-4">
              <span className="admin-logo__mark">P</span>
              <div>
                <div className="fs-4 fw-bold">PTPKM</div>
                <small className="text-light opacity-75">
                  Appointment Booking
                </small>
              </div>
            </div>

            <hr className="border-light opacity-25" />

            <nav>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-menu ${isActive(item) ? "active" : ""}`}
                >
                  <i className={`bi ${item.icon}`} />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5">
              <button
                onClick={logout}
                className="btn btn-warning w-100 d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-box-arrow-right" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="col-lg-10">
          <div className="p-4">
            <div className="admin-topbar mb-4">
              <h4>
                <i className="bi bi-shield-check me-2 text-primary" />
                PTPKM Appointment Booking Platform
              </h4>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
