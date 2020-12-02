const express = require("express");
var rn = require("random-number");
const router = express.Router({ mergeParams: true });
const dataStore = require("../../data/dataStore");
const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

var gen = rn.generator({
  min: 100000,
  max: 999999,
  integer: true,
});

var crnGen = rn.generator({
  min: 100000000,
  max: 999999999,
  integer: true,
});

router
  .route("/customerInfo/:quoteId?")
  .get(async (req, res) => {
    logger.info(
      `app.api.customers - getting customer with quoteId - ${req.params.quoteId}`
    );
    res.send(JSON.stringify(await getCustomerInfo(req.params.quoteId)));
  })
  .post(async (req, res) => {
    logger.info(`app.api.customers - creating new customer`);
    res.send(JSON.stringify(await saveCustomerInfo(req.body)));
  });

let getCustomerInfo = async (quoteId) => {
  try {
    let record = await dataStore.findCustomer(quoteId);
    return record;
  } catch (error) {
    logger.error(
      `app.api.customers - getting customer#${quoteId} failed - ${JSON.stringify(
        error
      )}`
    );
  }
};

let saveCustomerInfo = async (data) => {
  try {
    let customer = "";
    if (data.id) {
      customer = await dataStore.findCustomer(data.id);
    } else {
      customer = {};
      customer.quoteId = gen().toString();
    }
    customer.firstName = data.firstName;
    customer.lastName = data.lastName;
    customer.dob = data.dob;
    customer.stAddress = data.stAddr;
    customer.apt = data.apt;
    customer.zip = data.zipCode;

    if (!data.id) {
      customer.id = crnGen().toString();
    }

    await dataStore.addCustomer(customer);

    return { crn: customer.id, quoteid: customer.quoteId };
  } catch (error) {
    logger.error(
      `app.api.customers - error creating new customer - ${JSON.stringify(
        error
      )}`
    );
  }
};

module.exports = router;
