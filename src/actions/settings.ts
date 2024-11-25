'use server';

import {getUserByEmail, getUserByID} from '@/data/user';
import {currentUser} from '@/lib/auth';
import {sendVerificationEmail} from '@/lib/mail';
import {generateVerificationToken} from '@/lib/tokens';
import prisma from '@/prisma/client';
import {SettingsSchema} from '@/schemas';
import {UserRole} from '@prisma/client';
import bcryptjs from 'bcryptjs';
import {z} from 'zod';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await currentUser();
	if (!user) return {error: 'Unauthorized'};

	const dbUser = await getUserByID(user.id!);
	if (!dbUser) return {error: 'Unauthorized'};
	if (dbUser.role === UserRole.GUEST)
		return {error: 'For security reasons, guest accounts cannot be modified.'};

	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	if (values.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);

		if (existingUser && existingUser.id !== user.id)
			return {error: 'Email already in use!'};

		const verificationToken = await generateVerificationToken(values.email);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return {success: 'Verification email sent!'};
	}

	if (values.password && values.newPassword && dbUser.password) {
		const passwordsMatch = await bcryptjs.compare(
			values.password,
			dbUser.password
		);

		if (!passwordsMatch) return {error: 'Incorrect password!'};

		const hashedPassword = await bcryptjs.hash(values.newPassword, 10);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await prisma.user.update({
		where: {id: dbUser.id},
		data: {
			...values,
		},
	});

	return {success: 'Settings Updated!'};
};
