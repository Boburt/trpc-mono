import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log("nextauth", req.nextauth);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("authorized", token);
        if (!token) return false;
        return true;
      },
    },
  }
);
export const config = {
  // matcher: ["/profile"],
  matcher: ["/((?!register|api|login).*)"],
};
