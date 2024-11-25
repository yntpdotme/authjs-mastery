'use client';

import {login} from '@/actions/login';
import {CardWrapper} from '@/components/auth/card-wrapper';
import {FormError} from '@/components/form-error';
import {FormSuccess} from '@/components/form-success';
import {Button} from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {LoginSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider'
			: '';

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [showTwoFactor, setShowTwoFactor] = useState(false);

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');

		startTransition(async () => {
			const res = await login(values, callbackUrl);
			if (res?.error) {
				form.reset();
				setError(res.error);
			}
			if (res?.success) {
				form.reset();
				setSuccess(res?.success);
			}
			if (res?.twoFactor) {
				setShowTwoFactor(true);
			}
		});
	};

	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButtonLabel="Don't have an account"
			backButtonHref="/auth/register"
			showSocial
			showGuestLogin
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						{showTwoFactor && (
							<FormField
								control={form.control}
								name="code"
								render={({field}) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="123456"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="email"
									render={({field}) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="john.doe@example.com"
													type="email"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({field}) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="******"
													type="password"
													disabled={isPending}
												/>
											</FormControl>

											<Button
												size="sm"
												variant="link"
												className="px-0 font-normal"
												asChild
											>
												<Link href="/auth/reset">Forgot password?</Link>
											</Button>

											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>

					<FormError message={error || urlError} />

					<FormSuccess message={success} />

					<Button type="submit" className="w-full" disabled={isPending}>
						{showTwoFactor ? 'Confirm' : 'Login'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
