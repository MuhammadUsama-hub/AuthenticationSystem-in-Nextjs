import { dbConnect } from "@/lib/dbConfig";
import { User } from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

dbConnect(process.env.MONGO_URI as string);

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { email } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ mesg: "email does not Exist ", ststus: 404 });
    }

    //email sending for reset password
    await sendEmail({ email, emailType:"RESET", userId: user._id });
    return NextResponse.json({
      mesg: "Email successfully send to reset password",
      status: 200,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      mesg: "something Went wrong " + error,
      status: 500,
    });
  }
};
export {
  POST
}
