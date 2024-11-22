'use client';

import {admin} from '@/actions/admin';
import {RoleGate} from '@/components/auth/role-gate';
import {FormSuccess} from '@/components/form-success';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {UserRole} from '@prisma/client';
import axios from 'axios';
import {toast} from 'sonner';

const AdminPage = () => {
	const onApiRouteClick = async () => {
		try {
			const res = await axios.get('/api/admin');
			if (res?.statusText === 'OK') toast.success('Allowed API Route!');
		} catch {
			toast.error('Forbidden API Route!');
		}
	};

	const onServerActionClick = async () => {
		try {
			const res = await admin();
			if (res.error) toast.error(res.error);
			if (res.success) toast.success(res.success);
		} catch {
			toast.error('Something went Wrong!');
		}
	};

	return (
		<Card className="w-[90%] sm:w-[600px]">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">🔑 Admin</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<RoleGate allowedRole={UserRole.ADMIN}>
					<FormSuccess message="Only Admins allowed to see this content!" />
				</RoleGate>

				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only API Route</p>
					<Button onClick={onApiRouteClick}>Click to test</Button>
				</div>

				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only Server Action</p>
					<Button onClick={onServerActionClick}>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default AdminPage;
