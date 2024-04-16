import { NextResponse } from '../node_modules/next/server';
import withAuth from './utils/withAuth';

export function mainMiddleware() {
  const res = NextResponse.next();
  return res;
}

const requireAuth = [
  '/dashboard**',
  '/leaderboard',
  '/profile',
  '/settings**',
  '/competition/browse/registration**',
  '/competition/detail/submit_project**',
];

export default withAuth(mainMiddleware, requireAuth);
