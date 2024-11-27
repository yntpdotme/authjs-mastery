'use client';

import UserButton from '@/components/auth/user-button';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="mt-4 flex w-[90%] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm sm:w-[610px]">
      <NavigationMenu className="sm:hidden">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-xl font-semibold">
              🔐 <span className="ml-1.5">Auth</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-2">
              <Button
                variant={pathname === '/server' ? 'default' : 'ghost'}
                asChild
                className="w-full justify-start"
              >
                <Link href="/server">Server</Link>
              </Button>
              <Button
                variant={pathname === '/client' ? 'default' : 'ghost'}
                asChild
                className="w-full justify-start"
              >
                <Link href="/client">Client</Link>
              </Button>
              <Button
                variant={pathname === '/admin' ? 'default' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href="/admin">Admin</Link>
              </Button>
              <Button
                variant={pathname === '/settings' ? 'default' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href="/settings">Settings</Link>
              </Button>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="hidden gap-x-2.5 sm:flex">
        <Button
          variant={pathname === '/server' ? 'default' : 'outline'}
          asChild
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          variant={pathname === '/client' ? 'default' : 'outline'}
          asChild
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button variant={pathname === '/admin' ? 'default' : 'outline'} asChild>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          variant={pathname === '/settings' ? 'default' : 'outline'}
          asChild
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </div>
  );
};
