const mongo = require("mongodb").MongoClient;
const collection = process.env.COLLECTION_NAME;
const connectionString = process.env.CONNECTION_STRING;
const dbName = process.env.DB_NAME;
let clientPromise;

const createDbConnection = () => {
  if (!clientPromise) {
    clientPromise = getDbConnection();
  }
};

const getDbConnection = () => {
  return new Promise((resolve, reject) => {
    mongo.connect(
      connectionString,
      {
        connectTimeoutMS: 30000,
        useNewUrlParser: true,
        keepAlive: 1,
        useUnifiedTopology: true
      },
      (err, client) => {
        if (err) {
          console.log("Failed to connect MongoDB");
          reject(err);
        } else {
          console.log("Successfully created MongoDB connection");
          resolve(client);
        }
      }
    );
  });
};

const findCustomer = async (customerId) => {
  let client = await clientPromise;
  let db = client.db(dbName);
  let filter = { id: customerId };
  return new Promise((resolve, reject) => {
    try {
      db.collection(collection).findOne(filter, async (err, customer) => {
        if (err) {
          console.log(`Something went wrong - ${err}`);
          reject();
        }
        resolve(customer);
      });
    } catch (error) {
      console.log(`Something went wrong, Error - ${error}`);
      reject();
    }
  });
};

const addCustomer = async (customerInfo) => {
  let client = await clientPromise;
  let db = client.db(dbName);
  let filter = { quoteId: customerInfo.quoteId };
  let objectId, action;
  try {
    let saveResult = await db
      .collection(collection)
      .replaceOne(filter, customerInfo, {
        upsert: true,
      });
    objectId = saveResult.insertedId;
    action = "upserted";
  } catch (error) {
    console.log(`Failed to update mongo - QuoteID : ${customerInfo.quoteId}`);
    console.log(`Error - ${error}`);
  }
  console.log(`customer with QuoteID - ${customerInfo.quoteId} ${action}`);
  // client.close()
  return objectId;
};

module.exports = {
  createDbConnection,
  addCustomer,
  findCustomer,
};
