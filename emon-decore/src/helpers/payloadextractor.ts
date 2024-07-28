import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const getPaylod = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || ""; //
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    console.log("something went wrong" + error.message);
  }
};

export { getPaylod };
