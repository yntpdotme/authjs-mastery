import authConfig from '@/auth.config';
import {getUserByID} from '@/data/user';
import prisma from '@/prisma/client';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {UserRole} from '@prisma/client';
import NextAuth, {type DefaultSession} from 'next-auth';
import {JWT} from 'next-auth/jwt';

declare module 'next-auth/jwt' {
	interface JWT {
		role?: UserRole;
	}
}

declare module 'next-auth' {
	interface Session {
		user: {
			role: UserRole;
		} & DefaultSession['user'];
	}
}

export const {handlers, signIn, signOut, auth} = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {strategy: 'jwt'},
	callbacks: {
		async signIn({user, account}) {
			// Allow OAuth without email verification
			if (account?.provider !== 'credentials') return true;

			const existingUser = await getUserByID(user.id!);

			// Prevent sign in without email verification
			if (!existingUser?.emailVerified) return false;

			// TODO: Add 2FA check

			return true;
		},
		async jwt({token}) {
			if (!token.sub) return token;

			const existingUser = await getUserByID(token.sub);
			if (!existingUser) return token;

			token.role = existingUser.role;
			return token;
		},
		async session({token, session}) {
			if (token.sub && session.user) session.user.id = token.sub;

			if (token.role && session.user) session.user.role = token.role;

			return session;
		},
	},
	events: {
		async linkAccount({user}) {
			await prisma.user.update({
				where: {id: user.id},
				data: {emailVerified: new Date()},
			});
		},
	},
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	...authConfig,
});
