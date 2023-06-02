import { NextRequest } from "next/server";
import { User } from "../../../../types/user";
import clientPromise from "../../../../utils/connectDB";
import { Sort, SortDirection } from "mongodb";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const pageString = searchParams.get("page");

  let page: number = 0;
  if (pageString) {
    page = parseInt(pageString, 10);
  }
  let limit: number = 0;
  const limitString = searchParams.get("limit");

  if (limitString) limit = parseInt(limitString, 10);

  const sortString = searchParams.get("sort");

  let sort: string;
  if (sortString != null) {
    sort = searchParams.get("sort")?.valueOf() as string;
  } else {
    sort = "name";
  }
  const orderString = searchParams.get("order");
  const order: SortDirection = orderString
    ? (parseInt(orderString, 10) as SortDirection)
    : (1 as SortDirection);

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
  const skip = page * limit - limit;
  const sortField: Sort = sort; // Replace 'fieldName' with the actual field name you want to use for sorting
  const orderField: SortDirection = order; // Replace 1 with the desired sort direction (1 for ascending, -1 for descending)
  const users = await db
    .collection<User>("users")
    .find({})
    .limit(limit == 0 ? 0 : limit)
    .skip(page == 0 ? 0 : skip)
    .toArray();

  //.sort({ [sortField]: orderField })
  return new Response(JSON.stringify(users), {
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
    for (let i: number = 100; i < 200; i++) {
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
  } catch (error) {}
};

const GET_USERS_LIMIT = async (req: any) => {
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
