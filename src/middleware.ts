import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const protectedRoutes = ["/items/add", "/items/manage"];

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/items/add", "/items/manage"],
};
