import clientPromise from "../../../../utils/connectDB";

export const GET = async (req: any) => {
  return new Response(JSON.stringify({ message: "Hello from users" }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const POST = async (req: any) => {
  const { name, password } = await req.json();

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

    let myPost = await db.collection("users").insertOne({ name, password });

    return new Response(JSON.stringify({ myPost }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
