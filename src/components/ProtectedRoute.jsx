import { Navigate } from "react-router-dom";
import { userStore } from '../store/user';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {
    const user = userStore((state) => state.user);
    return !user.username || !user.id ? <Navigate to="/login" replace /> : children
};

export default ProtectedRoute;