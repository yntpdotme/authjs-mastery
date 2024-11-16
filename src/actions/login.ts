'use server';

import {LoginSchema} from '@/schemas';
import {z} from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const {success} = LoginSchema.safeParse(values);

	if (!success) return {error: 'Invalid fields'};

	return {success: 'Email sent'};
};
