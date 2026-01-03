const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all slots
router.get("/", (req, res) => {
  db.query("SELECT * FROM slots", (err, results) => {
    if (err) return res.status(500).json(err);
    // Convert isBooked 0/1 → true/false
    const slots = results.map(slot => ({
      ...slot,
      isBooked: slot.isBooked === 1
    }));
    res.json(slots);
  });
});

// BOOK a slot
router.post("/book/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE slots SET isBooked = TRUE WHERE id = ? AND isBooked = FALSE",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Slot already booked" });
      }

      res.json({ message: "Slot booked successfully" });
    }
  );
});

module.exports = router;
