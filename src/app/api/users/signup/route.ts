import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
// connectes();
// console.log("hello from signup route");
// console.log("hello from signup route again");
import { MongoClient } from "mongodb";

// export async function POST(request: NextRequest) {
//   try {
//     const reqbody = await request.json();
//     const { username, email, password } = reqbody;
//     console.log(reqbody);

//     // check if user exists already
//     // const user = await User.findOne({ email });
//     // if (user) {
//     //   return NextResponse.json(
//     //     { error: "user already exists" },
//     //     { status: 400 }
//     //   );
//     // }

//     //hash password
//     // const salt = await bcryptjs.genSalt(10);
//     // const hashedPassword = await bcryptjs.hash(password, salt);

//     const newuser = new User({
//       username,
//       email,
//       password,
//     }).save();
//     console.log("new user created");

//     const savedUser = await newuser.save();
//     console.log("saved the user");

//     return NextResponse.json({
//       message: "user created successfully",
//       success: true,
//       savedUser,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 550 });
//   }
// }
{
  /*POST request*/
}
export async function POST(request: Request) {
  // Replace the uri string with your connection string.
  // Read the request body as text
  let bodyText = await request.text();
  let bodys = JSON.parse(bodyText);

  console.log("textisBody", bodys);
  console.log("password is", bodys.user.password);
  const uri = "mongodb+srv://anuj:qwerty312.@cluster0.r9aauxw.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db("test");
    const inventry = database.collection("users");
    console.log("before query");
    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    console.log("middle query");
    //hash and salt

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(bodys.user.password, salt);
    bodys.user.password = hashedPassword;
    const productt = await inventry.insertOne(bodys);
    console.log("after query");

    // console.log(movie);

    return NextResponse.json({ productt, ok: true });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
