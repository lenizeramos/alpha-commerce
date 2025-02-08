import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => console.log("✅ connected to db"))
  .catch((err: Error) => console.log("❌ failed to connect to db", err));

export default prisma;
