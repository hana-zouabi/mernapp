const express = require("express");
const router = express.Router();
const Person = require("../Models/Person");

// GET all persons
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find().sort({ date: -1 });
    res.json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new person
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, address, work } = req.body;

    // Validation
    if (!fullName || !email) {
      return res
        .status(400)
        .json({ message: "Full name and email are required" });
    }

    // Check for duplicate email
    const existing = await Person.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newPerson = new Person({ fullName, email, phone, address, work });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET person by ID
router.get("/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ message: "Person not found" });
    res.json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE person by ID
router.put("/:id", async (req, res) => {
  try {
    const { fullName, email, phone, address, work } = req.body;

    // Validation
    if (!fullName || !email) {
      return res
        .status(400)
        .json({ message: "Full name and email are required" });
    }

    // Check for duplicate email (exclude current person)
    const existing = await Person.findOne({
      email,
      _id: { $ne: req.params.id },
    });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const updated = await Person.findByIdAndUpdate(
      req.params.id,
      { fullName, email, phone, address, work },
      { new: true },
    );

    if (!updated) return res.status(404).json({ message: "Person not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE person by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Person not found" });
    res.json({ message: "Person deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
