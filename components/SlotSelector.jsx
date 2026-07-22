export default function SlotSelector({
  availableSlots,
  selectedSlot,
  setSelectedSlot,
}) {
  if (!availableSlots.length) {
    return (
      <div className="alert alert-warning">
        No slots available
      </div>
    );
  }

  return (
    <div className="d-flex gap-3 flex-wrap">
      {availableSlots.map((slot) => (
        <button
          key={slot}
          type="button"
          className={`btn ${
            selectedSlot === slot
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setSelectedSlot(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}