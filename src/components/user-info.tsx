import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {UserRole} from '@prisma/client';
import {type DefaultSession} from 'next-auth';

type userInfoProps = {
	user?: {
		role: UserRole;
		isTwoFactorEnabled: boolean;
	} & DefaultSession['user'];
	label: string;
};

export const UserInfo = ({user, label}: userInfoProps) => {
	return (
		<Card className="w-[90%] sm:w-[610px]">
			<CardHeader>
				<p className="text-2xl font-bold text-center">{label}</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">ID</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.id}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Name</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.name}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Email</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.email}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Role</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.role}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Two Factor Authentication</p>
					<Badge variant={user?.isTwoFactorEnabled ? 'success': 'destructive'}>{user?.isTwoFactorEnabled ? 'ON' : 'OFF'}</Badge>
				</div>
			</CardContent>
		</Card>
	);
};
