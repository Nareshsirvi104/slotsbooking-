import { useEffect, useState } from "react";
import "../styles/SlotBooking.css";

export default function SlotBooking() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch slots from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/slots")
      .then(res => res.json())
      .then(data => {
        setSlots(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch slots:", err);
        setLoading(false);
      });
  }, []);

  // Book selected slot
  const bookSlot = async () => {
    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/slots/book/${selectedSlot}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        // Update slots locally
        setSlots(slots.map(s =>
          s.id === selectedSlot ? { ...s, isBooked: true } : s
        ));
        setSelectedSlot(null);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  if (loading) return <p className="loading">Loading slots...</p>;

  return (
    <div className="container">
      <h1>Book Your Slot</h1>

      <div className="slot-grid">
        {slots.map(slot => (
          <button
            key={slot.id}
            className={`slot-btn 
              ${slot.isBooked ? "booked" : ""} 
              ${selectedSlot === slot.id ? "selected" : ""}`}
            disabled={slot.isBooked}
            onClick={() => setSelectedSlot(slot.id)}
          >
            {slot.time} {slot.isBooked && <span className="badge">Booked</span>}
          </button>
        ))}
      </div>

      <button
        className="confirm-btn"
        onClick={bookSlot}
        disabled={!selectedSlot}
      >
        Confirm Booking
      </button>
    </div>
  );
}
