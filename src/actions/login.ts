'use server';

import {signIn} from '@/auth';
import {getUserByEmail} from '@/data/user';
import {sendVerificationEmail} from '@/lib/mail';
import {generateVerificationToken} from '@/lib/tokens';
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
