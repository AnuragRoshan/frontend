// src/store/slices/authSlices.ts - Updated logout section
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, User, TokenPair } from "../api/authApi";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  sessionId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registrationStep: "form" | "verification" | "completed";
}

// Helper function to save auth state to localStorage
const saveAuthState = (state: Partial<AuthState>): void => {
  try {
    const authData = {
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      sessionId: state.sessionId,
    };
    localStorage.setItem("auth", JSON.stringify(authData));
  } catch (error) {
    console.error("Error saving auth state to localStorage:", error);
  }
};

// Helper function to clear auth state from localStorage
const clearAuthState = (): void => {
  try {
    localStorage.removeItem("auth");
    // Also clear any other auth-related items
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error removing auth state from localStorage:", error);
  }
};

// Load initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      return {
        user: parsed.user || null,
        accessToken: parsed.accessToken || null,
        refreshToken: parsed.refreshToken || null,
        sessionId: parsed.sessionId || null,
        isAuthenticated: Boolean(parsed.accessToken && parsed.user),
        isLoading: false,
        error: null,
        registrationStep: "form",
      };
    }
  } catch (error) {
    console.error("Error loading auth state from localStorage:", error);
    clearAuthState();
  }

  return {
    user: null,
    accessToken: null,
    refreshToken: null,
    sessionId: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    registrationStep: "form",
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    // Set credentials after successful login/register
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        tokens: TokenPair;
      }>
    ) => {
      const { user, tokens } = action.payload;
      state.user = user;
      state.accessToken = tokens.accessToken;
      state.refreshToken = tokens.refreshToken;
      state.sessionId = tokens.sessionId;
      state.isAuthenticated = true;
      state.error = null;

      saveAuthState(state);
    },

    // Update access token after refresh
    updateTokens: (state, action: PayloadAction<{ tokens: TokenPair }>) => {
      const { tokens } = action.payload;
      state.accessToken = tokens.accessToken;
      state.refreshToken = tokens.refreshToken;
      state.sessionId = tokens.sessionId;

      saveAuthState(state);
    },

    // Update user data
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveAuthState(state);
      }
    },

    // Set registration step
    setRegistrationStep: (
      state,
      action: PayloadAction<"form" | "verification" | "completed">
    ) => {
      state.registrationStep = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Logout action - completely clear all auth data
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.sessionId = null;
      state.isAuthenticated = false;
      state.error = null;
      state.registrationStep = "form";
      state.isLoading = false;

      // Clear localStorage
      clearAuthState();
    },

    // Reset auth state to initial state
    resetAuth: (state) => {
      const initialState = getInitialState();
      Object.assign(state, initialState);
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Handle register
    builder.addMatcher(authApi.endpoints.registerUser.matchPending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        const response = action.payload;

        if (response.success && response.data) {
          if (response.data.requiresVerification) {
            state.registrationStep = "verification";
          } else {
            state.user = response.data.user;
            state.accessToken = response.data.tokens.accessToken;
            state.refreshToken = response.data.tokens.refreshToken;
            state.sessionId = response.data.tokens.sessionId;
            state.isAuthenticated = true;
            state.registrationStep = "completed";

            saveAuthState(state);
          }
        }
      }
    );

    builder.addMatcher(
      authApi.endpoints.registerUser.matchRejected,
      (state, action) => {
        state.isLoading = false;
        if (action.error) {
          const errorPayload = action.error as {
            data?: { message?: string; error?: string };
          };
          state.error = errorPayload.data?.message || "Registration failed";
        }
      }
    );

    // Handle login
    builder.addMatcher(authApi.endpoints.loginUser.matchPending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        const response = action.payload;

        if (response.success && response.data) {
          state.user = response.data.user;
          state.accessToken = response.data.tokens.accessToken;
          state.refreshToken = response.data.tokens.refreshToken;
          state.sessionId = response.data.tokens.sessionId;
          state.isAuthenticated = true;
          state.error = null;

          saveAuthState(state);
        }
      }
    );

    builder.addMatcher(
      authApi.endpoints.loginUser.matchRejected,
      (state, action) => {
        state.isLoading = false;
        if (action.error) {
          const errorPayload = action.error as {
            data?: { message?: string; error?: string };
          };
          state.error = errorPayload.data?.message || "Login failed";
        } else {
          state.error =
            typeof action.error === "object" &&
            action.error !== null &&
            "message" in action.error &&
            typeof (action.error as { message?: string }).message === "string"
              ? (action.error as { message?: string }).message ?? "Login failed"
              : "Login failed";
        }
      }
    );

    // Handle logout - backend logout success
    builder.addMatcher(authApi.endpoints.logoutUser.matchPending, (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
      // Clear all auth data
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.sessionId = null;
      state.isAuthenticated = false;
      state.error = null;
      state.registrationStep = "form";
      state.isLoading = false;

      clearAuthState();
    });

    builder.addMatcher(authApi.endpoints.logoutUser.matchRejected, (state) => {
      // Even if logout fails on backend, clear frontend state for security
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.sessionId = null;
      state.isAuthenticated = false;
      state.error = null;
      state.registrationStep = "form";
      state.isLoading = false;

      clearAuthState();
    });

    // Handle refresh token
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, action) => {
        const response = action.payload;

        if (response.success && response.data) {
          const { tokens } = response.data;
          state.accessToken = tokens.accessToken;
          state.refreshToken = tokens.refreshToken;
          state.sessionId = tokens.sessionId;

          saveAuthState(state);
        }
      }
    );

    // Handle get current user
    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchFulfilled,
      (state, action) => {
        const response = action.payload;

        if (response.success && response.data) {
          state.user = response.data;
          saveAuthState(state);
        }
      }
    );
  },
});

export const {
  setCredentials,
  updateTokens,
  updateUser,
  setRegistrationStep,
  setError,
  clearError,
  logout,
  resetAuth,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
