import { NextRequest } from "next/server";
import clientPromise from "../../../../../utils/connectDB";

export const GET = async (req: NextRequest) => {
  try {
    const client = await clientPromise;
    if (!process.env.DB_NAME) {
      return new Response(
        JSON.stringify({
          message: "Invalid/Missing environment variable: DB_NAME",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users");

    const usersCount = await collection.countDocuments({});

    return new Response(JSON.stringify({ usersCount }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {}
};
