const express = require("express");
const config = require("config");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Customer = require("../models/Customer");

// @route   GET api/customers/customerInfo/:id?
// @desc    Get customer
// @access  Private
router.get("/customers/customerInfo/:id?", auth, async (req, res) => {
  try {
    res.json({});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/customers/customerInfo/:id?
// @desc    Create or update a customer
// @access  Private
router.post(
  "/customers/customerInfo/:id?",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      return res.json({});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/customers
// @desc    Get all customers
// @access  Public
router.get("/customers", async (req, res) => {
  try {
    res.json([]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/customers/customerInfo/:id?
// @desc    Delete customer & related quotes and policies
// @access  Private
router.delete("/customers/customerInfo/:id?", auth, async (req, res) => {
  try {
    res.json({ msg: "Customer deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
