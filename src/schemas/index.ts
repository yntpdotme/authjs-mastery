import {UserRole} from '@prisma/client';
import {z} from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(1, {message: 'Password is required'}),
	code: z.string().optional(),
});

export const RegisterSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(6, {message: 'Minimum 6 characters required'}),
	name: z.string().min(1, {
		message: 'Name is required',
	}),
});

export const ResetSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: 'Minimum 6 characters required',
	}),
});

export const SettingsSchema = z
	.object({
		name: z.string().optional(),
		isTwoFactorEnabled: z.boolean().optional(),
		role: z.nativeEnum(UserRole),
		email: z.string().email().optional(),
		password: z
			.string()
			.min(6, {
				message: 'Minimum 6 characters required',
			})
			.optional(),
		newPassword: z
			.string()
			.min(6, {
				message: 'Minimum 6 characters required',
			})
			.optional(),
	})
	.refine(data => (data.password && !data.newPassword ? false : true), {
		message: 'New password is required!',
		path: ['newPassword'],
	})
	.refine(data => (data.newPassword && !data.password ? false : true), {
		message: 'Password is required!',
		path: ['password'],
	});
