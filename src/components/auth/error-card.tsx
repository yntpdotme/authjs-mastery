import {CardWrapper} from '@/components/auth/card-wrapper';
import {ExclamationTriangleIcon} from '@radix-ui/react-icons';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something Went Wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className="size-5 text-destructive" />
      </div>
    </CardWrapper>
  );
};
