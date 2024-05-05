import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../../context/SessionContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProtectedRoute = ({ children }: any) => {
    const loggedIn = useIsLoggedIn();
    console.log("loggedIn", loggedIn);
    if (loggedIn !== true) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};
