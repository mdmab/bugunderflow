import { authMiddleware } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  // publicRoutes: ['/anyone-can-visit-this-route'],
  publicRoutes: ['/',
                 '/home',
                 '/threads/new',
                 '/search',
                 '/my-threads',

                 '/api/threads/get-all',
                 '/api/threads/get-most-viewed-threads',
                 '/api/threads/get',
                 '/api/threads/post-thread',
                 '/api/threads/post-reply',
                 '/api/threads/remove-reply',
                 '/api/threads/remove-thread',
                 '/api/threads/add-view',
                 '/api/threads/vote',
                 '/api/search'
                //  '/mobile'
                ]
  // Routes that can always be accessed, and have
  // no authentication information
  // ignoredRoutes: ['/no-auth-in-this-route'],
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};