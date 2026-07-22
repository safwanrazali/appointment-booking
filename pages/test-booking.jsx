import { useState } from "react";

export default function TestBooking() {
  const [loading, setLoading] = useState(false);

  const createBooking = async () => {
    setLoading(true);

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requesterName: "Safwan Razali",
        requesterEmail: "safwan@email.com",
        requesterPhone: "0123456789",
        department: "PTPKM",
        appointmentDate: new Date(),
        purpose: "Testing Appointment",
      }),
    });

    const data = await response.json();

    console.log(data);

    alert("Booking Saved");
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <button
        className="btn btn-primary"
        onClick={createBooking}
      >
        {loading ? "Saving..." : "Create Test Booking"}
      </button>
    </div>
  );
}