import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request: NextRequest, response: NextResponse) {
  const uri = "mongodb+srv://anuj:qwerty312.@cluster0.r9aauxw.mongodb.net/";
  const client = new MongoClient(uri);
  let data = await request.text();
  let psuhb = await JSON.parse(data);
  try {
    const database = await client.db("test");
    const inventry = await database.collection("patients_data");
    console.log("connected to dbFially");
    // let bodys = JSON.parse(bodyText);

    console.log("psuh is", psuhb);
    const psuh = await inventry.insertOne(psuhb);
    console.log("psuh found:", psuh);

    return NextResponse.json(psuh);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while fetching data from MongoDB.");
  } finally {
    await client.close();
  }
}
