import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

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
  // ডেভেলপমেন্টে গ্লোবাল ভ্যারিয়েবল ব্যবহার করা হয় যাতে কানেকশন বারবার ওপেন না হয়।
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // প্রোডাকশন মোডে
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * dbConnect Function: ডাটাবেজ কানেকশন পেতে এটি ব্যবহার করবেন।
 */
export const dbConnect = async () => {
  try {
    const connectedClient = await clientPromise;
    // নিশ্চিত করুন আপনার MongoDB Atlas-এ ডাটাবেজটির নাম "asset-gadget"
    return connectedClient.db("asset-gadget");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default clientPromise;