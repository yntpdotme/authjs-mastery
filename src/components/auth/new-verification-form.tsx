'use client';

import {newVerification} from '@/actions/new-verification';
import {CardWrapper} from '@/components/auth/card-wrapper';
import {FormError} from '@/components/form-error';
import {FormSuccess} from '@/components/form-success';
import {useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';
import {BeatLoader} from 'react-spinners';

export const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const onSubmit = useCallback(async () => {
		if (!token) {
			setError('Missing token!');
			return;
		}

		try {
			const data = await newVerification(token);
			setSuccess(data.success);
			setError(data.error);
		} catch (error) {
			setError('Something went wrong!');
		}
	}, [token]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<CardWrapper
			headerLabel="Confirming your verification"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
		>
			<div className="flex items-center w-full justify-center">
				{!success && !error && <BeatLoader speedMultiplier={0.5} />}
				<FormSuccess message={success} />
				<FormError message={error} />
			</div>
		</CardWrapper>
	);
};
