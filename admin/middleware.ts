import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log("nextauth", req.nextauth);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // console.log("req", req.nextUrl);
        // console.log("token", token);

        if (!token) return false;
        if (!token.accessToken) return false;

        const path = req.nextUrl.pathname.split("/");
        console.log("searchParams", req.nextUrl.pathname);
        console.log("toke", token);
        // get last values from path
        const entity = path[path.length - 1];

        if (entity.length > 0 && token.rights) {
          const rights = token.rights as string[];
          if (!rights.includes(`${entity}.list`)) {
            return false;
          }
        }

        return true;
      },
    },
  }
);
export const config = {
  // matcher: ["/profile"],
  matcher: [
    "/((?!register|api|static|login|.*\\..*|_next|_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
