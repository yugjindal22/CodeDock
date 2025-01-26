import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const pathname = req.nextUrl.pathname;
      
      // Only protect these specific routes
      const protectedPaths = [
        '/create-snippet',
        '/update-snippet',
        '/profile'  // Only protect the main profile page
      ];

      // Allow access to other user profiles (/profile/[id])
      if (pathname.startsWith('/profile/')) {
        return true;
      }

      // Check if current path is protected
      const isProtectedPath = protectedPaths.some(path => pathname === path);
      
      return !isProtectedPath || !!token;
    },
  },
});

export const config = {
  matcher: ['/create-snippet', '/profile', '/profile/:path*', '/update-snippet/:path*'],
};
