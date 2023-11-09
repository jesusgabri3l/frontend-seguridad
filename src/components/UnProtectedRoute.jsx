import { Navigate } from "react-router-dom";
import { userStore } from '../store/user';

// eslint-disable-next-line react/prop-types
const UnProtectedRoute = ({children}) => {
    const user = userStore((state) => state.user);
    return user.username || user.id ? <Navigate to="/" replace /> : children
};

export default UnProtectedRoute;