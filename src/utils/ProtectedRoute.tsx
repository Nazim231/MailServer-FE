import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = ({ redirectTo = '/login' }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;