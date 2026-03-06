//asset-gadget
//9wx1soXHzjiqd7Cj
//const uri = "mongodb+srv://asset-gadget:<db_password>@asset-gadget.stgcbqn.mongodb.net/?appName=asset-gadget";
// const uri = "mongodb+srv://asset-gadget:9wx1soXHzjiqd7Cj@asset-gadget.stgcbqn.mongodb.net/?appName=asset-gadget";

import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // ডেভেলপমেন্ট মোডে গ্লোবাল ভ্যারিয়েবল ব্যবহার করা হয় যাতে কানেকশন বারবার ওপেন না হয়।
  // এটি Next.js এর 'Fast Refresh' এর সময় কানেকশন লিমিট শেষ হওয়া আটকায়।
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // প্রোডাকশন মোডে সরাসরি নতুন কানেকশন তৈরি করা হয়।
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * dbConnect Function: আপনার API-তে ডাটাবেজ কানেকশন পেতে এটি ব্যবহার করবেন।
 * উদাহরণ: const db = await dbConnect();
 */
export const dbConnect = async () => {
  try {
    const connectedClient = await clientPromise;
    // এখানে আপনার ডাটাবেজের নাম দিন (যেমন: asset-gadget)
    return connectedClient.db("asset-gadget");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default clientPromise;