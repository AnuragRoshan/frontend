// src/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "../store/hooks";
import { authApi } from "../store/api/authApi";
import { logout } from "../store/slices/authSlices";

interface LogoutOptions {
  silent?: boolean; // Don't show success toast
  redirectTo?: string; // Custom redirect path
}

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutMutation, { isLoading }] = authApi.useLogoutUserMutation();

  const logoutUser = async (options: LogoutOptions = {}) => {
    const { silent = false, redirectTo = "/" } = options;

    try {
      // Call backend logout API
      const result = await logoutMutation().unwrap();

      if (result.success) {
        // Clear Redux state and localStorage
        dispatch(logout());

        // Clear RTK Query cache
        dispatch(authApi.util.resetApiState());

        // Show success message unless silent
        if (!silent) {
          toast.success("Logged out successfully!");
        }

        // Redirect to landing page or specified path
        navigate(redirectTo, { replace: true });

        console.log("✅ Logout successful");
      } else {
        throw new Error(result.message || "Logout failed");
      }
    } catch (error: unknown) {
      console.error("❌ Logout error:", error);

      // Even if backend fails, clear frontend state for security
      dispatch(logout());
      dispatch(authApi.util.resetApiState());

      // Show error message
      let errorMessage = "Logout failed, but you've been signed out locally";
      interface LogoutError {
        data?: { message?: string };
        message?: string;
      }
      if (typeof error === "object" && error !== null) {
        const err = error as LogoutError;
        if ("data" in err && typeof err.data?.message === "string") {
          errorMessage = err.data.message!;
        } else if ("message" in err && typeof err.message === "string") {
          errorMessage = err.message!;
        }
      }
      toast.error(errorMessage);

      // Redirect anyway for security
      navigate(redirectTo, { replace: true });
    }
  };

  return {
    logoutUser,
    isLoading,
  };
};
