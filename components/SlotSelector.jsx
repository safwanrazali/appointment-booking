export default function SlotSelector({
  availableSlots,
  selectedSlot,
  setSelectedSlot,
}) {
  if (!availableSlots.length) {
    return (
      <div className="alert alert-warning d-flex align-items-center gap-2 mb-0">
        <i className="bi bi-calendar-x" />
        No slots available for this date — please pick another day.
      </div>
    );
  }

  return (
    <div className="d-flex gap-2 flex-wrap">
      {availableSlots.map((slot) => (
        <button
          key={slot}
          type="button"
          className={`btn d-flex align-items-center gap-2 ${
            selectedSlot === slot ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setSelectedSlot(slot)}
        >
          <i className="bi bi-clock" />
          {slot}
        </button>
      ))}
    </div>
  );
}
