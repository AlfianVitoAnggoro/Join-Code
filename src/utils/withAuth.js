import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { startWithRequirePath } from './index';

const authPaths = ['/register**', '/login'];
const onlySoftwareDeveloperPath = [
  '/',
  '/collaboration**',
  '/competition**',
  '/leaderboard',
  '/profile',
  '/settings**',
];
// const onlyOrganizationPath = ['/dashboard/settings/organization**'];
const onlyAdminPath = ['/dashboard/users**', '/dashboard/badges**'];

const withAuth = (middleware, requireAuth) => {
  return async (req, next) => {
    const { pathname } = req.nextUrl;
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    /**
     * Skenario login
     * login berdasarkan role user
     * - jika role = "REGULAR" maka redirect ke menu /user/dashboard
     * - jika role = "ADMIN" maka redirect ke menu /admin/dashboard
     */

    if (!token && startWithRequirePath(requireAuth, pathname)) {
      const url = new URL('/login', req.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    if (token) {
      if (startWithRequirePath(authPaths, pathname)) {
        const url = new URL('/', req.url);
        return NextResponse.redirect(url);
      }

      if (
        token.role === 'Software Developer' &&
        pathname.startsWith('/dashboard')
      ) {
        const url = new URL('/', req.url);
        return NextResponse.redirect(url);
      }

      if (
        token.role !== 'Software Developer' &&
        startWithRequirePath(onlySoftwareDeveloperPath, pathname)
      ) {
        if (token.role === 'Organization' || token.role === 'Admin') {
          const url = new URL('/dashboard', req.url);
          return NextResponse.redirect(url);
        } else {
          const url = new URL('/', req.url);
          return NextResponse.redirect(url);
        }
      }

      // if (
      //   token.role !== 'Organization' &&
      //   startWithRequirePath(onlyOrganizationPath, pathname)
      // ) {
      //   const url = new URL('/dashboard', req.url);
      //   return NextResponse.redirect(url);
      // }

      if (
        token.role !== 'Admin' &&
        startWithRequirePath(onlyAdminPath, pathname)
      ) {
        const url = new URL('/dashboard', req.url);
        return NextResponse.redirect(url);
      }
    }

    return middleware(req, next);
  };
};

export default withAuth;
