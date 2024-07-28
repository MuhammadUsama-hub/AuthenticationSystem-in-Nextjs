import { dbConnect } from "@/lib/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect(process.env.MONGO_URI as string);

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); //middle ware

    const { token } = body;

    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ mesg: "token expires " });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    user.save(); // save to data base

    console.log(user);
    return NextResponse.json(
      { mesg: "successfully verified" },
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
