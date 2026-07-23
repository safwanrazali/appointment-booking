import Image from "next/image";
import Link from "next/link";
import BookingForm from "../components/BookingForm";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container py-5">
      <nav className="navbar navbar-expand-lg navbar-light justify-content-end">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" href="/admin">
              <i className="bi bi-person-circle me-2" />
              Admin
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hero-banner">
        <Image
          src="/image/banner.png"
          alt="Klinik Migrasi PQC"
          width={1400}
          height={300}
          priority
          style={{
            width: "100%",
            display: "block",
          }}
        />
      </div>

      <div className="text-center mb-5">
        <h1>Appointment Booking Platform</h1>

        <p>Schedule your appointment online.</p>
      </div>

      <BookingForm />
    </div>
  );
}
