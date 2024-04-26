import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth"

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute