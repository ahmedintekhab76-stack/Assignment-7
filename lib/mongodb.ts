import { MongoClient } from "mongodb";

// Development এ hot-reload হলে বারবার নতুন connection খোলা ঠেকাতে global এ রাখা হয়েছে।
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export function getMongoClient(): MongoClient | null {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) return null;
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri, {
      // Database এ না ঢুকতে পারলে ৩০ সেকেন্ড ঝুলে না থেকে ৮ সেকেন্ডেই error দেবে
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
  }
  return globalForMongo._mongoClient;
}
