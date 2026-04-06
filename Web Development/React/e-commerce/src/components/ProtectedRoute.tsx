import {Navigate} from 'react-router';
import {useSelector} from 'react-redux';
import type {RootState} from '../store';

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
}
