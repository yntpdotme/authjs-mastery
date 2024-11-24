'use client';
import {UserInfo} from '@/components/user-info';
import {useCurrentUser} from '@/hooks/useCurrentUser';

const ClientPage = () => {
	const user = useCurrentUser();
	console.log('user', user);

	return <UserInfo user={user} label="📱 Client component" />;
};

export default ClientPage;