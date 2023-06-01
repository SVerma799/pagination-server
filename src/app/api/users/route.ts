import { User } from "../../../../types/user";
import clientPromise from "../../../../utils/connectDB";

export const GET = async (req: any) => {
  return new Response(JSON.stringify({ message: "Hello from users" }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });

  ///  I will include the pagination over here...
};

export const POST = async (req: any) => {
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

    const users: User[] = [];
    for (let i: number = 0; i < 100; i++) {
      const name = `User ${i}`;
      const email = `email${i}@gmail.com`;
      const password = `password${i}`;

      users.push({ name, email, password });
    }

    const result = await db.collection<User>("users").insertMany(users);

    return new Response(JSON.stringify({ message: result }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
