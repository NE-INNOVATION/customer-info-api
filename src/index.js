import { createErrorResponse } from "./utils/index.js";
import errorConstants from "./errors/constants.js";
import createCustomer from "./handlers/customer.js";

export async function handler(event) {
  try {
    const { path, method } = event.requestContext.http;
    console.log("\n\n\n###", path, method, "###\n\n\n");

    if (path === "/api/customers/customerInfo") {
      if (method.toLowerCase() === "post") {
        return await createCustomer(JSON.parse(event.body));
      }
    }
  } catch (err) {
    return createErrorResponse(500, errorConstants.commons.internalServerError);
  }
}
