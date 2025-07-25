import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Footer from './Footer';

// ProtectedRoute component checks if the user is authenticated and has the required role
// If not authenticated, it redirects to the login page.
// If authenticated but does not have the required role, it redirects to the home page.
// If authenticated and has the required role, it renders the children components.
// allowedRoles is an optional prop that specifies which user roles are allowed to access the route.
// If allowedRoles is not provided, any authenticated user can access the route.
// This component is typically used to protect routes that require authentication and specific user roles.
// It uses the useSelector hook to access the authentication state from the Redux store.
const ProtectedRoute = ({ children, allowedRoles }) => {
    // Access the user state from the Redux store
    // The user state is expected to be in the auth slice of the Redux store.
    // If the user is not authenticated, it will be null.
    // If the user is authenticated, it will contain user information including roles.
    const { user } = useSelector((state) => state.auth);

    // If the user is not authenticated, redirect to the login page.
    // If the user is authenticated but does not have the required role, redirect to the home
    if (!user) {
        return (
            <>
                <Navigate to="/login" />
                <Footer />
            </>)
    }
    // If allowedRoles is provided and the user's role is not in the allowedRoles array,
    // redirect to the home page.
    // This ensures that only users with the specified roles can access the protected route.
    // If allowedRoles is not provided, any authenticated user can access the route.
    // This allows for flexible role-based access control.
    // If the user's role is in the allowedRoles array, render the children components.
    // This allows the protected route to render its content only for users with the appropriate roles.
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <>
                <Navigate to="/" />
                <Footer />
            </>
        );
    }

    return children;
};

export default ProtectedRoute;