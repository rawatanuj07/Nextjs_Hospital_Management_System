import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
// connectes();
// console.log("hello from signup route");
// console.log("hello from signup route again");
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { test } from "node:test";

export async function POST(request: NextRequest) {
  let bodyText = await request.text();
  let bodys = JSON.parse(bodyText);
  let remails = bodys.user.email;
  let rpasswordd = bodys.user.password;

  console.log("Request Body:", bodys);
  console.log("email is", bodys.user.email);
  const uri = "mongodb+srv://anuj:qwerty312.@cluster0.r9aauxw.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = await client.db("test");
    const inventry = await database.collection("users");
    console.log("connected to db");
    // check if user exists already
    const usere = await inventry.findOne({ "user.email": remails });
    if (!usere) {
      return (
        NextResponse.json({ error: "user does not exists" }, { status: 400 }),
        console.log("user does not exists")
      );
    }
    //  else {
    //   console.log("email is verified");
    // }
    //compare password
    // const userp = await inventry.findOne(rpasswordd);
    console.log("password is", usere.user.password);
    console.log("password is", bodys.user.password);

    const validPassword = await bcryptjs.compare(
      bodys.user.password,
      usere.user.password
    );
    if (!validPassword) {
      return (
        NextResponse.json({ error: "invalid password" }, { status: 400 }),
        console.log("invalid password")
      );
    } else {
      console.log("password verify done");
    }

    //create token data
    const tokenData = {
      id: usere._id,
      username: usere.username,
      email: usere.email,
    };
    console.log("tokenData created succesfully");

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    console.log("token created succesfully");
    //send token to client cookie
    const response = NextResponse.json({
      message: "user logged in successfully",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    console.log("token sent to client succesfully");

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 550 });
  }
}
