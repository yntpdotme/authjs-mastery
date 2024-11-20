'use server';

import {getUserByEmail} from '@/data/user';
import {sendPasswordResetEmail} from '@/lib/mail';
import {generatePasswordResetToken} from '@/lib/tokens';
import {ResetSchema} from '@/schemas';

import {z} from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const {success, data} = ResetSchema.safeParse(values);

	if (!success) return {error: 'Invalid email!'};

	const existingUser = await getUserByEmail(data.email);
	if (!existingUser) return {error: 'Email not found'};

	const passwordResetToken = await generatePasswordResetToken(
		existingUser.email
	);
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token
	);

	return {success: 'Reset email sent!'};
};
