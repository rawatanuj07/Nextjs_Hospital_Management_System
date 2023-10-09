import { MongoClient } from "mongodb";
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
      const nm = highestInvoice[0].invoiceNum;
      console.log("highestInvoiceNumis:", nm);
      console.log("TypeOfhighestInvoiceNumis:", typeof nm);
      return NextResponse.json(
        { highestInvoiceNum: nm }
        // { status: 200 }
      );
    } else {
      NextResponse.json({ error: "No invoices found" }, { status: 404 });
    }
    console.log("response is:", res);
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
