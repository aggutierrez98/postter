import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest | any, _: NextFetchEvent) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log(session);

  if (!session) {
    return NextResponse.redirect("/auth/login");
  }

  return NextResponse.next();
}
