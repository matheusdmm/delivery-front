import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { JSX } from 'react';
import { Spinner } from '../components/ui/spinner';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner size="sm" className="bg-black dark:bg-white" />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
