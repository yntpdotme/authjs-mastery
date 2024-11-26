import {Navbar} from '@/app/(protected)/_components/navbar';

type ProtectedLayoutProps = {
	children: React.ReactNode;
};

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
	return (
		<div className="min-h-full flex flex-col gap-y-10 items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to to-blue-800">
			<Navbar />
			{children}
		</div>
	);
};

export default ProtectedLayout;
