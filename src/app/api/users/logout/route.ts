import { dbConnect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnect(process.env.MONGO_URI as string);

const GET = async (req: NextRequest) => {
  try {
    const response = NextResponse.json({
      mesg: "Successfully logedOut",
      Status: 200,
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({
      mesg: "something went wrong" + error.message,
      status: 500,
    });
  }
};

export { GET };
