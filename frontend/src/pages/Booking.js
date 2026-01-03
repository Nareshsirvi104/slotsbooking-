import { useEffect, useState } from "react";
import axios from "axios";

function Booking() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/slots")
      .then((res) => setSlots(res.data))
      .catch((err) => console.log(err));
  }, []);

  const bookSlot = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/slots/book/${id}`
      );
      alert(res.data.message);

      setSlots(
        slots.map((s) =>
          s.id === id ? { ...s, isBooked: 1 } : s
        )
      );
      setSelectedSlot(null);
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Book Your Slot
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => setSelectedSlot(slot.id)}
            disabled={slot.isBooked === 1}
            className={`p-4 rounded shadow font-medium
              ${
                slot.isBooked === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : selectedSlot === slot.id
                  ? "bg-blue-500 text-white"
                  : "bg-green-200 hover:bg-green-300"
              }`}
          >
            {slot.time} {slot.isBooked === 1 ? "(Booked)" : ""}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          if (!selectedSlot) return alert("Select a slot first!");
          bookSlot(selectedSlot);
        }}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default Booking;
