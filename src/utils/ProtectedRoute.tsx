import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { Nav, NavLinkProps } from '@/components/Nav';
import { File, Inbox, Plus, Send } from 'lucide-react';
import { useEffect } from 'react';

const ProtectedRoute = ({ redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo(redirectTo);
    }
  }, [isAuthenticated]);

  const links: NavLinkProps[] = [
    {
      title: 'Compose',
      icon: Plus,
      link: '/compose',
    },
    {
      title: 'Inbox',
      label: '4',
      icon: Inbox,
      link: '/inbox',
    },
    {
      title: 'Drafts',
      icon: File,
      link: '/draft',
    },
    {
      title: 'Sent',
      icon: Send,
      link: '/sent',
    },
  ];

  return (
    <div className="flex h-svh w-screen overflow-hidden">
      <Nav links={links} isCollapsed={false} />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
