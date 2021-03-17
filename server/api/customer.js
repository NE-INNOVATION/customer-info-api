const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const rn = require("random-number");

const gen = rn.generator({
  min: 100000,
  max: 999999,
  integer: true,
});

const Customer = require("../models/Customer");

// @route   GET api/customers/customerInfo/:id?
// @desc    Get customer
// @access  Private
router.get("/customers/customerInfo/:id?", async (req, res) => {
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
  "/customers/customerInfo",
  [
    [
      check("firstName", "Firstname is required").not().isEmpty(),
      check("lastName", "Lastname is required").not().isEmpty(),
      check("dob", "Date of Birth is required").not().isEmpty(),
      check("stAddr", "Street Address is required").not().isEmpty(),
      check("apt", "Apartment is required").not().isEmpty(),
      check("zipCode", "Zip Code is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, dob, stAddr, apt, zipCode } = req.body;

    try {
      const quoteId = gen().toString();
      const customer = new Customer({
        quoteId,
        firstName,
        lastName,
        dob,
        stAddr,
        apt,
        zipCode,
      });

      await customer.save();

      res.json({ quoteId });
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
router.delete("/customers/customerInfo/:id?", async (req, res) => {
  try {
    res.json({ msg: "Customer deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
