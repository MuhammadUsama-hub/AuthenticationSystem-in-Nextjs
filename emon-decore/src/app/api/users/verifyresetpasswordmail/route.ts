import { dbConnect } from "@/lib/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcyrptjs from "bcryptjs";
dbConnect(process.env.MONGO_URI as string);

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); //middle ware

    const { token, newPassword } = body;

    console.log(token);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ mesg: "token expires " });
    }

    //hashing password
    const salt = await bcyrptjs.genSalt(10);
    const hashedPassword = await bcyrptjs.hash(newPassword, salt);

    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    user.password = hashedPassword;

    user.save(); // save to data base

    console.log(user);
    return NextResponse.json(
      { mesg: "password Reset Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { mesg: "something went wrong in verification" + error.message },
      { status: 500 }
    );
  }
};
export { POST };
