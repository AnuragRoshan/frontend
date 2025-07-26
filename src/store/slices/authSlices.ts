// src/store/slices/authSlice.ts
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
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Logout user
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.sessionId = null;
      state.isAuthenticated = false;
      state.error = null;
      state.registrationStep = "form";

      clearAuthState();
    },

    // Reset state
    resetAuth: () => getInitialState(),
  },
  extraReducers: (builder) => {
    // Handle register user
    builder
      .addMatcher(authApi.endpoints.registerUser.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        authApi.endpoints.registerUser.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          const response = action.payload;

          if (response.success && response.data) {
            const { user, tokens, requiresVerification } = response.data;

            // Set credentials
            state.user = user;
            state.accessToken = tokens.accessToken;
            state.refreshToken = tokens.refreshToken;
            state.sessionId = tokens.sessionId;
            state.isAuthenticated = true;

            // Set registration step based on verification requirement
            state.registrationStep = requiresVerification
              ? "verification"
              : "completed";

            saveAuthState(state);
          }
        }
      )
      .addMatcher(
        authApi.endpoints.registerUser.matchRejected,
        (state, action) => {
          state.isLoading = false;

          // Handle different error types
          if (action.payload) {
            const errorPayload = action.payload as {
              data?: { message?: string; error?: string };
            };
            state.error = errorPayload.data?.message || "Registration failed";
          } else {
            state.error = action.error.message || "Registration failed";
          }
        }
      );

    // Handle login user
    builder
      .addMatcher(authApi.endpoints.loginUser.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          const response = action.payload;

          if (response.success && response.data) {
            const { user, tokens } = response.data;

            // Set credentials
            state.user = user;
            state.accessToken = tokens.accessToken;
            state.refreshToken = tokens.refreshToken;
            state.sessionId = tokens.sessionId;
            state.isAuthenticated = true;
            state.registrationStep = "completed";

            saveAuthState(state);
          }
        }
      )
      .addMatcher(
        authApi.endpoints.loginUser.matchRejected,
        (state, action) => {
          state.isLoading = false;

          if (action.payload) {
            const errorPayload = action.payload as {
              data?: { message?: string; error?: string };
            };
            state.error = errorPayload.data?.message || "Login failed";
          } else {
            state.error = action.error.message || "Login failed";
          }
        }
      );

    // Handle logout
    builder.addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.sessionId = null;
      state.isAuthenticated = false;
      state.error = null;
      state.registrationStep = "form";

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
