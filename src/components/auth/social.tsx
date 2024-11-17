'use client';

import {Button} from '@/components/ui/button';
import {signIn} from 'next-auth/react';
import {FaGithub} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';

export const Social = () => {
	// const onClick = (provider: 'google' | 'github') => {
	// 	signIn(provider);
	// };

	return (
		<div className="flex items-center w-full gap-x-2">
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => signIn('google')}
			>
				<FcGoogle className="size-5" />
			</Button>

			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => signIn('github')}
			>
				<FaGithub className="size-5" />
			</Button>
		</div>
	);
};
