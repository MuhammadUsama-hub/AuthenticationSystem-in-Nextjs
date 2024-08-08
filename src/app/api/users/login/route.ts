import { dbConnect } from "@/lib/dbConfig";
import { User } from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import bcyrptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect(process.env.MONGO_URI as string);

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); //midleware for URL Parsing

    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { mesg: "Invalid Credentials" },
        { status: 404 }
      );
    }
    console.log(user);

    const validatePassword = await bcyrptjs.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json({ mesg: "Invalid Password" }, { status: 404 });
    }
    //JWT token Creation

    const tokenPayload = {
      id: user._id,
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: "1hr",
    });

    const response = NextResponse.json(
      { mesg: "Logged In Successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token);

    return response;
  } catch (error: any) {
    return NextResponse.json({
      mesg: "Something Went Wrong ..." + error.message,
      ststus: 500,
    });
  }
};

export { POST };
