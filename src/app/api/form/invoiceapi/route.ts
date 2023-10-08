import { MongoClient } from "mongodb";
import { NodeNextResponse } from "next/dist/server/base-http/node";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextResponse) {
  const uri = "mongodb+srv://anuj:qwerty312.@cluster0.r9aauxw.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const collection = client.db("test").collection("patients_data"); // replace with your database and collection name
    const highestInvoice = await collection
      .find()
      .sort({ invoiceNum: -1 })
      .limit(1)
      .toArray();

    if (highestInvoice.length > 0) {
      console.log("highestInvoiceNumis:", highestInvoice[0].invoiceNum);
      console.log("TypeOfhighestInvoiceNumis:", typeof highestInvoice[0]);
      return NextResponse.json(
        { highestInvoiceNum: highestInvoice[0].invoiceNum++ }
        // { status: 200 }
      );
    } else {
      NextResponse.json({ error: "No invoices found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

// return NextResponse.json(psuh);
