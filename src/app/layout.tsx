import {auth} from '@/auth';
import SourceCode from '@/components/source-code';
import {Toaster} from '@/components/ui/sonner';
import type {Metadata} from 'next';
import {SessionProvider} from 'next-auth/react';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Toaster />
					<SourceCode link="https://github.com/yntpdotme/authjs-mastery?tab=readme-ov-file#authjs-mastery" />
					{children}
				</body>
			</html>
		</SessionProvider>
	);
}

export const metadata: Metadata = {
	title: 'Auth.js Mastery',
	description: 'Robust authentication with Auth.js',
	icons: {
		icon: '/favicon.png',
	},
};
