import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { ErrorIcon } from "react-hot-toast";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
  //creating public paths
  const isPublicPath =
    path == "/login" ||
    path == "/signup" ||
    path == "/verifyresetpasswordmail" ||
    path == "/verifysignupemail";
  const token = request.cookies.get("token")?.value || '';
  console.log({token, path})

  

  if(isPublicPath && token){
    return NextResponse.redirect(new URL("/", request.url));
  }
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL("/login", request.url));
  }

  
  } catch (error:any) {
    console.log('something goes wrong'+ error.message)
    
  }
  
}


export const config = {
  matcher: [
  '/profile',
  '/login',
  '/signup'
  ],
};
