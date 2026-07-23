import { useEffect, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import SlotSelector from "./SlotSelector";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [availableSlots, setAvailableSlots] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    requesterName: "",
    requesterEmail: "",
    requesterPhone: "",
    purpose: "",
  });

  const formatDate = (date) => {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  };

  const formatDisplayDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  useEffect(() => {
    let isMounted = true;

    const fetchSlots = async () => {
      try {
        const formattedDate = formatDate(selectedDate);

        const response = await fetch(
          `/api/available-slots?date=${formattedDate}`,
        );

        const data = await response.json();

        if (!isMounted) return;

        setAvailableSlots(data.availableSlots || []);

        setSelectedSlot("");
      } catch (error) {
        console.error(error);
      }
    };

    fetchSlots();

    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  const refreshSlots = async () => {
    const formattedDate = formatDate(selectedDate);

    const response = await fetch(`/api/available-slots?date=${formattedDate}`);

    const data = await response.json();

    setAvailableSlots(data.availableSlots || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          appointmentDate: formatDate(selectedDate),
          appointmentSlot: selectedSlot,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(
          `Booking submitted successfully.

Reference Number:
${data.data?.referenceNo || "-"}

Date:
${formatDisplayDate(selectedDate)}

Slot:
${selectedSlot}`,
        );

        setForm({
          requesterName: "",
          requesterEmail: "",
          requesterPhone: "",
          purpose: "",
        });

        setSelectedSlot("");

        await refreshSlots();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);

      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h4 className="mb-4">Select Appointment Date</h4>

        <BookingCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <hr />

        <h4 className="mb-3">Available Slots</h4>

        <SlotSelector
          availableSlots={availableSlots}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />

        <hr />

        {message && (
          <div className="alert alert-info">
            <pre className="mb-0">{message}</pre>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            value={form.requesterName}
            onChange={(e) =>
              setForm({
                ...form,
                requesterName: e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email Address"
            value={form.requesterEmail}
            onChange={(e) =>
              setForm({
                ...form,
                requesterEmail: e.target.value,
              })
            }
            required
          />

          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Phone Number"
            value={form.requesterPhone}
            onChange={(e) =>
              setForm({
                ...form,
                requesterPhone: e.target.value,
              })
            }
            required
          />

          <textarea
            rows="4"
            className="form-control mb-3"
            placeholder="Purpose of Appointment"
            value={form.purpose}
            onChange={(e) =>
              setForm({
                ...form,
                purpose: e.target.value,
              })
            }
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!selectedSlot || loading}
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
