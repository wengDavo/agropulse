import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

function PrivateRoutes() {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" />
}
export default PrivateRoutes;
