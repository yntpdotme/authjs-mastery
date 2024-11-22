'use client';

import {LogoutButton} from '@/components/auth/logout-button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useCurrentUser} from '@/hooks/useCurrentUser';
import {ExitIcon} from '@radix-ui/react-icons';
import {FaUser} from 'react-icons/fa';

const UserButton = () => {
	const user = useCurrentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="outline-none">
				<Avatar className="size-[34px]">
					<AvatarImage src={user?.image || ''} />
					<AvatarFallback className="bg-sky-500">
						<FaUser className="text-white " />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<LogoutButton>
					<DropdownMenuItem>
						<ExitIcon /> Logout
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;
