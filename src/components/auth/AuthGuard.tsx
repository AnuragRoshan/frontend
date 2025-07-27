// src/components/auth/AuthGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/slices/authSlices";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard component that redirects authenticated users away from auth pages
 * Used to wrap login/signup pages to prevent authenticated users from accessing them
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const authState = useAppSelector(selectAuth);

  // Show loading while checking authentication status
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
        <div>Checking authentication...</div>
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

  // If user is authenticated, redirect them to appropriate dashboard
  if (authState.isAuthenticated && authState.user) {
    // Redirect based on user type
    if (authState.user.userType === "INFLUENCER") {
      return <Navigate to="/dashboard" replace />;
    } else if (authState.user.userType === "BRAND") {
      return <Navigate to="/brandDashboard" replace />;
    } else {
      // Fallback for any other user types
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If user is not authenticated, allow access to auth pages
  return <>{children}</>;
};

export default AuthGuard;
