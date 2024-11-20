'use server';

import {signIn} from '@/auth';
import {getTwoFactorConfirmationByUserId} from '@/data/two-factor-confirmation';
import {getTwoFactorTokenByEmail} from '@/data/two-factor-token';
import {getUserByEmail} from '@/data/user';
import {sendTwoFactorTokenEmail, sendVerificationEmail} from '@/lib/mail';
import {generateTwoFactorToken, generateVerificationToken} from '@/lib/tokens';
import prisma from '@/prisma/client';
import {DEFAULT_LOGIN_REDIRECT} from '@/routes';
import {LoginSchema} from '@/schemas';
import {AuthError} from 'next-auth';
import {z} from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const {success, data} = LoginSchema.safeParse(values);

	if (!success) return {error: 'Invalid fields'};

	const existingUser = await getUserByEmail(data.email);
	if (!existingUser) return {error: 'User does not exist!'};
	if (!existingUser.password)
		return {
			error: 'This account was created using social login!',
		};

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return {success: 'Confirmation email sent!'};
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (data.code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
			if (!twoFactorToken) return {error: 'Invalid Code!'};
			if (twoFactorToken.token !== data.code) return {error: 'Invalid Code!'};

			const hasExpired = new Date(twoFactorToken.expires) < new Date();
			if (hasExpired) return {error: 'Code expired!'};

			await prisma.twoFactorToken.delete({
				where: {id: twoFactorToken.id},
			});

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id
			);
			if (existingConfirmation) {
				await prisma.twoFactorConfirmation.delete({
					where: {id: existingConfirmation.id},
				});
			}

			await prisma.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

			return {twoFactor: true};
		}
	}

	try {
		await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return {error: 'Invalid credentials!'};
				default:
					return {error: 'Something went wrong!'};
			}
		}

		throw error;
	}
};
