'use client';

import {Button} from '@/components/ui/button';
import {DEFAULT_LOGIN_REDIRECT} from '@/routes';
import {signIn} from 'next-auth/react';
import {useSearchParams} from 'next/navigation';
import {FaGithub} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="size-5" />
      </Button>

      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick('github')}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
};

import {guestLogin} from '@/actions/guest-login';
import {FormError} from '@/components/form-error';
import {FormSuccess} from '@/components/form-success';
import {useState, useTransition} from 'react';

export const GuestLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onGuestLogin = () => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      const res = await guestLogin(callbackUrl);
      if (res?.error) {
        setError(res.error);
      }
      if (res?.success) {
        setSuccess(res.success);
      }
    });
  };

  return (
    <div className="w-full space-y-4">
      <FormError message={error} />
      <FormSuccess message={success} />

      <Button
        type="button"
        variant="outline"
        onClick={onGuestLogin}
        disabled={isPending}
        className="w-full text-[13px]"
      >
        Continue As Guest
      </Button>
    </div>
  );
};
