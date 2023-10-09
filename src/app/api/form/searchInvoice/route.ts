import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Combine both sets of data into a single object
export async function POST(request: any, response: NextResponse) {
  const uri = "mongodb+srv://anuj:qwerty312.@cluster0.r9aauxw.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("test");
    const collection = database.collection("patients_data");
    await client.connect();
    console.log("connected to db succesfuly");
    const invoiceNums = await request.text();
    let psuhb = await JSON.parse(invoiceNums);

    console.log("invoiceNum is:", psuhb);
    console.log("invoiceNum is:", typeof psuhb);

    // Retrieve patient form data
    let netFormData = await collection.findOne({ invoiceNum: psuhb });
    console.log("patientFormData is:", netFormData);

    // let data = await request.text();

    // let psuhb = await JSON.parse(data);

    // Retrieve test details data
    // let testDetailsData = await collection.find({ invoiceNums }).toArray();

    // Combine the data into a single object
    console.log("response is:", netFormData);
    return NextResponse.json({ netFormData });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    client.close();
  }
}
