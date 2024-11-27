import {Navbar} from '@/app/(protected)/_components/navbar';

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
  return (
    <div className="to flex min-h-full flex-col items-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
