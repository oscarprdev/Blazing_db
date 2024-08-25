import { auth } from '@/src/auth';

const PUBLIC_ROUTES = ['/', '/sign-up', '/sign-in'];

export default auth(req => {
	if (!req.auth && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
		const newUrl = new URL('/sign-in', req.nextUrl.origin);
		return Response.redirect(newUrl);
	}
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
