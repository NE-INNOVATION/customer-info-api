import { v4 } from "uuid";
import { dbConnectAndExecute } from "../db/index.js";
import { createErrorResponse, createResponse } from "../utils/index.js";
import Customer from "../db/models/Customer.js";
import errorConstants from "../errors/constants.js";
import MONGO_CONNECTION_STRING from "../env/index.js";

export default async function createCustomer(body) {
  const { firstName, lastName, dob, stAddr, apt, zipCode } = body;

  console.log(
    "\n\n\n###",
    firstName,
    lastName,
    dob,
    stAddr,
    apt,
    zipCode,
    "###\n\n\n"
  );

  if (!firstName || !lastName || !dob || !stAddr || !apt || !zipCode) {
    return createErrorResponse(400, errorConstants.commons.badRequest);
  }

  const quoteId = v4();

  const customer = new Customer({
    quoteId,
    firstName,
    lastName,
    dob,
    stAddr,
    apt,
    zipCode,
  });

  const result = await dbConnectAndExecute(MONGO_CONNECTION_STRING, () =>
    customer.save()
  );

  if (result) {
    return createResponse(200, {
      message: "Customer Created Successfully!!!",
      quoteId,
    });
  } else {
    throw new Error();
  }
}
