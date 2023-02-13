import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { hasAnyRole, isAuthenticated, Role } from '../../util/auth';

type Props = {
  roles: Role[]
}

const PrivateRoutes = ({ roles }: Props) => {
  if(!isAuthenticated()) {
    toast.info('You need to be logged to access this page');
    return <Navigate to='/' replace />
  }
  if(roles.length === 0 || hasAnyRole(roles)) return <Outlet />
  toast.info(`You don't have permission to access this page`);
  return <Navigate to='/' replace />
}

export default PrivateRoutes;
