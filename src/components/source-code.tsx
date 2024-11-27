import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import Link from 'next/link';
import {FaGithub} from 'react-icons/fa';

const SourceCode = ({link}: {link: string}) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({variant: 'link'}),
        'absolute bottom-3 right-2 animate-pulse text-white hover:drop-shadow-[-0.2rem_0_1rem_#f0f0f0] sm:bottom-5 sm:right-5',
      )}
    >
      <FaGithub className="scale-[2.5] sm:scale-[3.5]" />
    </Link>
  );
};

export default SourceCode;
