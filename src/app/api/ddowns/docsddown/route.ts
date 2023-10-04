import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request: NextRequest, response: NextResponse) {
  const uri = "mongodb+srv://anuj:qwerty312.@cluster0.r9aauxw.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    const database = await client.db("test");
    const inventry = await database.collection("docs_tests_data");
    const doctors = await inventry.find({}).toArray();
    console.log("Doctors found:", doctors);

    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while fetching data from MongoDB.");
  } finally {
    await client.close();
  }
}
