import BookingForm from "../components/BookingForm";

export default function Home() {
  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1>
          Appointment Booking Platform
        </h1>

        <p>
          Schedule your appointment online.
        </p>
      </div>

      <BookingForm />

    </div>
  );
}