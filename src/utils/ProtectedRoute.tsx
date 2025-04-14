import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';
import { Nav, NavLinkProps } from '@/components/Nav';
import { File, Inbox, Plus, Send } from 'lucide-react';

const ProtectedRoute = ({ redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to={redirectTo} />;
  // }

  const links: NavLinkProps[] = [
    {
      title: 'Compose',
      icon: Plus,
      variant: 'ghost',
    },
    {
      title: 'Inbox',
      label: '4',
      icon: Inbox,
      variant: 'default',
    },
    {
      title: 'Drafts',
      icon: File,
      variant: 'ghost',
    },
    {
      title: 'Sent',
      icon: Send,
      variant: 'ghost',
    },
  ];

  return (
    <div className="flex h-screen">
      <Nav links={links} isCollapsed={false} />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
