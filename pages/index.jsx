import Link from "next/link";
import BookingForm from "../components/BookingForm";

export default function Home() {
  return (
    <div className="container py-4 py-md-5">
      <div className="site-topbar">
        <Link className="admin-link" href="/admin">
          <i className="bi bi-shield-lock" />
          Admin
        </Link>
      </div>

      <div className="hero-banner mesh-bg">
        <div className="hero-eyebrow">Secure Digital Service</div>

        <div className="hero-media mb-4">
          <img src="/image/banner.png" alt="NACSA and PTPKM" />
        </div>

        <h1 className="hero-title">Appointment Booking Platform</h1>
        <p className="hero-subtitle">
          Schedule your visit to the Migration &amp; Cryptology Clinic in a few
          clicks — no queues, no paperwork, just pick a slot that works for you.
        </p>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-value">09:00–18:00</div>
            <div className="stat-label">Operating Hours</div>
          </div>
          <div className="stat">
            <div className="stat-value">2</div>
            <div className="stat-label">Daily Slots</div>
          </div>
          <div className="stat">
            <div className="stat-value">24h</div>
            <div className="stat-label">Advance Notice</div>
          </div>
        </div>
      </div>

      <div className="booking-shell">
        <BookingForm />
      </div>
    </div>
  );
}
