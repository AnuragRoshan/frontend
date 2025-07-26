// src/store/api/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import type { RootState } from "../store";

// Types matching backend interfaces
export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: "INFLUENCER" | "BRAND" | "ADMIN";
  isVerified: boolean;
  userStatus: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";
  socialAccounts?: Array<{
    provider: string;
    username: string;
    connectedAt: string;
    isActive: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: string;
  sessionId: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  details?: Record<string, unknown>;
  timestamp: string;
  requestId: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: "influencer" | "brand";
  username?: string;
  socialAccount?: {
    platform: string;
    handle: string;
  };
  termsAccepted: boolean;
}

export interface RegisterResponse {
  user: User;
  tokens: TokenPair;
  requiresVerification: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: TokenPair;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  tokens: TokenPair;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// Base query with auth token
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

// Define the enhanced base query type
type EnhancedBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  Record<string, unknown>,
  FetchBaseQueryMeta
>;

// Base query with re-auth logic
const baseQueryWithReauth: EnhancedBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to refresh token
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/api/auth/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Store the new token and retry the original request
        const refreshData =
          refreshResult.data as ApiResponse<RefreshTokenResponse>;
        if (refreshData.success && refreshData.data) {
          // The auth slice will handle updating the token via the fulfilled action
          result = await baseQuery(args, api, extraOptions);
        }
      } else {
        // Refresh failed, logout user
        api.dispatch(authApi.util.resetApiState());
      }
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    // Register user
    registerUser: builder.mutation<
      ApiResponse<RegisterResponse>,
      RegisterRequest
    >({
      query: (registerData) => ({
        url: "/api/auth/register",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["User"],
    }),

    // Login user
    loginUser: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (loginData) => ({
        url: "/api/auth/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["User"],
    }),

    // Get current user
    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => "/api/auth/me",
      providesTags: ["User"],
    }),

    // Refresh token
    refreshToken: builder.mutation<
      ApiResponse<RefreshTokenResponse>,
      RefreshTokenRequest
    >({
      query: (data) => ({
        url: "/api/auth/refresh",
        method: "POST",
        body: data,
      }),
    }),

    // Logout
    logoutUser: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User", "Auth"],
    }),

    // Verify email
    verifyEmail: builder.mutation<ApiResponse<void>, VerifyEmailRequest>({
      query: (data) => ({
        url: "/api/auth/verify-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Resend verification email
    resendVerification: builder.mutation<
      ApiResponse<void>,
      ResendVerificationRequest
    >({
      query: (data) => ({
        url: "/api/auth/resend-verification",
        method: "POST",
        body: data,
      }),
    }),

    // Forgot password
    forgotPassword: builder.mutation<ApiResponse<void>, ForgotPasswordRequest>({
      query: (data) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Reset password
    resetPassword: builder.mutation<ApiResponse<void>, ResetPasswordRequest>({
      query: (data) => ({
        url: "/api/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
