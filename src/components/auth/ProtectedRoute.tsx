// src/components/auth/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/slices/authSlices";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackPath?: string;
  requireAuth?: boolean;
  allowedUserTypes?: Array<"INFLUENCER" | "BRAND" | "ADMIN">;
}

/**
 * ProtectedRoute component that requires authentication to access
 * Used to wrap dashboard and other protected pages
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallbackPath = "/login",
  requireAuth = true,
  allowedUserTypes,
}) => {
  const location = useLocation();
  const authState = useAppSelector(selectAuth);

  // Show loading spinner while checking authentication
  if (authState.isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#666",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div>Loading...</div>
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 2s linear infinite",
          }}
        ></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && !authState.isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check if user type is allowed (if specified)
  if (
    requireAuth &&
    authState.isAuthenticated &&
    authState.user &&
    allowedUserTypes &&
    !allowedUserTypes.includes(authState.user.userType)
  ) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath =
      authState.user.userType === "BRAND" ? "/brandDashboard" : "/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  // If user is authenticated but trying to access auth pages (handled by AuthGuard)
  // This case shouldn't happen if AuthGuard is properly used, but keeping for safety
  if (!requireAuth && authState.isAuthenticated) {
    const redirectPath =
      authState.user?.userType === "BRAND" ? "/brandDashboard" : "/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
