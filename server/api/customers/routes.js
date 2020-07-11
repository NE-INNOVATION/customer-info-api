const express = require("express");
var rn = require("random-number");
const router = express.Router({ mergeParams: true });
const dataStore = require("../../data/dataStore");
const axios = require("axios");
const { Agent } = require("https");
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

const client = axios.create({
  httpsAgent: new Agent({
    rejectUnauthorized: false,
  }),
});

router
  .route("/customerInfo/:id")
  .get(async (req, res) => {
    logger.info(
      `app.api.customers - getting customer with id - ${req.params.id}`
    );
    res.send(JSON.stringify(await getCustomerInfo(req.params.id)));
  })
  .post(async (req, res) => {
    logger.info(`app.api.customers - creating new customer`);
    res.send(JSON.stringify(await saveCustomerInfo(req.body)));
  });

let getCustomerInfo = async (id) => {
  let record = await dataStore.findCustomer(id);
  return record;
};

let saveCustomerInfo = async (data) => {
  try {
    let customer = "";
    // if (data.id) {
    //   customer = await dataStore.findCustomer(data.id);
    // } else {
    customer = {};
    customer.quoteId = gen().toString();
    //}
    customer.firstName = data.firstName;
    customer.lastName = data.lastName;
    customer.dob = data.dob;
    customer.stAddress = data.stAddr;
    customer.apt = data.apt;
    customer.zip = data.zipCode;

    if (!data.id) {
      customer.id = crnGen().toString();
    }

    await client.post(
      `${process.env.DB_SERVICE_URL}/${process.env.COLLECTION_NAME}`,
      customer,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //dataStore.addCustomer(customer)

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
