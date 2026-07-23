import { useEffect, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import SlotSelector from "./SlotSelector";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [availableSlots, setAvailableSlots] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState("");

  const [message, setMessage] = useState("");

  const [bookingResult, setBookingResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    requesterName: "",
    requesterEmail: "",
    requesterPhone: "",
    agency: "",
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
    setBookingResult(null);

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
        setBookingResult({
          referenceNo: data.data?.referenceNo || "-",
          date: formatDisplayDate(selectedDate),
          slot: selectedSlot,
        });

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
    <div>
      <div className="row g-4 g-lg-5">
        <div className="col-lg-6">
          <h2 className="section-heading">
            <span className="section-heading__icon">
              <i className="bi bi-calendar3" />
            </span>
            Select Appointment Date
          </h2>

          <BookingCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <div className="calendar-legend">
            <span>
              <span className="dot dot--today" /> Today
            </span>
            <span>
              <span className="dot dot--selected" /> Selected
            </span>
            <span>
              <span className="dot dot--holiday" /> Public holiday / Not
              available
            </span>
            <span>
              <span className="dot dot--booked" /> Fully booked
            </span>
          </div>
        </div>

        <div className="col-lg-6">
          <h2 className="section-heading">
            <span className="section-heading__icon">
              <i className="bi bi-clock-history" />
            </span>
            Available Slots — {formatDisplayDate(selectedDate)}
          </h2>

          <SlotSelector
            availableSlots={availableSlots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />

          {bookingResult && (
            <div className="alert alert-success mt-4 d-flex gap-3 align-items-start">
              <i className="bi bi-check-circle-fill fs-4" />
              <div>
                <div className="fw-semibold mb-1">
                  Booking submitted successfully
                </div>
                <div className="mb-1">
                  <span className="ref-chip">
                    <i className="bi bi-hash" />
                    {bookingResult.referenceNo}
                  </span>
                </div>
                <div className="small text-muted">
                  {bookingResult.date} · {bookingResult.slot}
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className="alert alert-danger mt-4 d-flex gap-2 align-items-start">
              <i className="bi bi-exclamation-triangle-fill" />
              <div>{message}</div>
            </div>
          )}

          <hr className="my-4" />

          <h2 className="section-heading">
            <span className="section-heading__icon">
              <i className="bi bi-person-lines-fill" />
            </span>
            Your Details
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small text-muted">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Ahmad bin Ali"
                value={form.requesterName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requesterName: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={form.requesterEmail}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requesterEmail: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                placeholder="0123456789"
                value={form.requesterPhone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requesterPhone: e.target.value.replace(/\D/g, ""),
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted">
                Agency <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="e.g. PTPKM"
                value={form.agency}
                onChange={(e) =>
                  setForm({
                    ...form,
                    agency: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted">
                Purpose of Appointment
              </label>
              <textarea
                rows="4"
                className="form-control"
                placeholder="Briefly describe what you need help with"
                value={form.purpose}
                onChange={(e) =>
                  setForm({
                    ...form,
                    purpose: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
              disabled={!selectedSlot || loading}
            >
              {loading ? (
                "Submitting..."
              ) : (
                <>
                  <i className="bi bi-send-check" />
                  Submit Booking
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
