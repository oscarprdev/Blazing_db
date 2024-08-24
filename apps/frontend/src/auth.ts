import authConfig from './auth.config';
import NextAuth, { NextAuthResult } from 'next-auth';

const nextAuth = NextAuth({
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
			}

			return session;
		},
	},
	session: { strategy: 'jwt' },
	...authConfig,
});

export const signIn: NextAuthResult['signIn'] = nextAuth.signIn;
export const auth: NextAuthResult['auth'] = nextAuth.auth;
export const { GET, POST }: NextAuthResult['handlers'] = nextAuth.handlers;
export const signOut: NextAuthResult['signOut'] = nextAuth.signOut;
