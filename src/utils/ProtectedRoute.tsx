import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { Nav, NavLinkProps } from '@/components/Nav';
import { Inbox, Send } from 'lucide-react';
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
      title: 'Inbox',
      icon: Inbox,
      link: '/inbox',
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
