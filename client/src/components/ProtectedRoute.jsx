import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isPublicRoute, getUser } from '@/lib/auth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const currentPath = location.pathname;
  const user = getUser();

  if (!isPublicRoute(currentPath) && !isAuth) {
    return <Navigate to="/login" state={{ from: currentPath }} replace />;
  }

  if (currentPath.startsWith('/dashboard')) {
    if (user?.role === 'ADMIN' || user?.role === 'EDITOR' || user?.role === 'VIEWER') {
      return <Navigate to="/admin" replace />;
    }
    if (user?.role !== 'STUDENT') {
      return <Navigate to="/login" replace />;
    }
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;