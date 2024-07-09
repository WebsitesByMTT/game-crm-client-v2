import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export default function middleware(req) {
  const loggedin = req.cookies.get("userToken");
  const { pathname } = req.nextUrl;
  if (!loggedin && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  // Check if the user's designation is not 'company' and redirect them away from the games route
  if (
    jwt.decode(loggedin?.value)?.role !== "company" &&
    (pathname === "/game" ||
      pathname === "/transaction/all" ||
      pathname === "/clients/all" ||
      pathname === "/add-game")
  ) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  // For any other cases return
  return NextResponse.next();
}

export const config = { matcher: "/((?!api|static|.*\\..*|_next).*)" };
