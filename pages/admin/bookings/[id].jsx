import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";

export default function BookingDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function loadBooking() {
      const response = await fetch(`/api/bookings/${id}`);

      const data = await response.json();

      console.log(data);

      setBooking(data.data);
    }

    loadBooking();
  }, [id]);

  if (!booking) {
    return <AdminLayout>Loading...</AdminLayout>;
  }

  const deleteBooking = async () => {
    const confirmDelete = window.confirm("Delete this booking?");

    if (!confirmDelete) return;

    await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    router.push("/admin/bookings");
  };

  return (
    <AdminLayout>
      <h1 className="mb-4">Booking Details</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <p>
            <strong>Name:</strong>
            <br />
            {booking.requesterName}
          </p>

          <p>
            <strong>Email:</strong>
            <br />
            {booking.requesterEmail}
          </p>

          <p>
            <strong>Phone:</strong>
            <br />
            {booking.requesterPhone}
          </p>

          <p>
            <strong>Date:</strong>
            <br />
            {booking.appointmentDate}
          </p>

          <p>
            <strong>Slot:</strong>
            <br />
            {booking.appointmentSlot}
          </p>

          <p>
            <strong>Purpose:</strong>
            <br />
            {booking.purpose}
          </p>
          <hr />
          <button className="btn btn-danger" onClick={deleteBooking}>
            Delete Booking
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
