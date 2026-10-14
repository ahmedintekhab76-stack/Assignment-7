import { MongoClient } from "mongodb";

// Development এ hot-reload হলে বারবার নতুন connection খোলা ঠেকাতে global এ রাখা হয়েছে।
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export function getMongoClient(): MongoClient | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri);
  }
  return globalForMongo._mongoClient;
}
