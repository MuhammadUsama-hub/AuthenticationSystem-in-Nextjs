import { dbConnect } from "@/lib/dbConfig";
import { User } from "@/models/userModel";
import bcyrptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

dbConnect(process.env.MONGO_URI as string);
const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password, userName } = body;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ mesg: "email already Exist" });
    }

    //hashing password
    const salt = await bcyrptjs.genSalt(10);
    const hashedPassword = await bcyrptjs.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    console.log(savedUser._id);
    //send verification mail now because user is saved in db
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return Response.json({ mesg: "Registered  successfully" });
  } catch (error) {
    console.log("SomeThing goes wrong while registering a user" + error);
  }
};
export { POST };
