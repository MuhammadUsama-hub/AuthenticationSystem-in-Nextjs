import { dbConnect } from "@/lib/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getPaylod } from "@/helpers/payloadextractor";

dbConnect(process.env.MONGO_URI!);

const POST = async (req: NextRequest) => {
  try {
    const userId = await getPaylod(req);

    const user = await User.findOne({ userId }).select("-password ");

    if (!user) {
      return NextResponse.json({ mesg: "invalid token", status: 400 });
    }

    return NextResponse.json({
      mesg: "User Found successfully",
      status: 200,
      success: true,
      greeting: `Welcome ! ${user.userName}`,
    });
  } catch (error: any) {
    return NextResponse.json({
      mesg: "something went wrong" + error.message,
      status: 500,
    });
  }
};

export{
  POST
}
