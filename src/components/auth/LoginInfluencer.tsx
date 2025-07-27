// src/components/auth/LoginInfluencer.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import styled from "styled-components";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Facebook,
  Instagram,
  MailIcon,
} from "lucide-react";

// Redux imports
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { authApi } from "../../store/api/authApi";
import { setCredentials, selectAuth } from "../../store/slices/authSlices";

// Theme imports
import { sharedTheme } from "../../styles/theme/theme";
import ButtonLoader from "../Loader/ButtonLoader";

// Form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface ErrorResponse {
  data?: {
    message?: string;
    error?: string;
  };
}

const LoginInfluencer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux state
  const authState = useAppSelector(selectAuth);

  // RTK Query mutation
  const [loginUser, { isLoading }] = authApi.useLoginUserMutation();

  // Local state
  const [showPassword, setShowPassword] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle authentication success
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      toast.success(`Welcome back, ${authState.user.firstName}!`);

      // Redirect based on user type
      if (authState.user.userType === "INFLUENCER") {
        navigate("/dashboard");
      } else {
        navigate("/brandDashboard");
      }
    }
  }, [authState.isAuthenticated, authState.user, navigate]);

  // Helper function to handle API errors
  const handleApiError = (error: ErrorResponse | { message: string }) => {
    console.error("Login error:", error);

    if ("data" in error) {
      const errorResponse = error as ErrorResponse;
      const errorData = errorResponse.data;

      if (errorData?.error === "INVALID_CREDENTIALS") {
        toast.error("Invalid email or password. Please try again.");
      } else if (errorData?.error === "ACCOUNT_NOT_VERIFIED") {
        toast.error("Please verify your email before logging in.");
      } else if (errorData?.error === "ACCOUNT_SUSPENDED") {
        toast.error("Your account has been suspended. Please contact support.");
      } else if (errorData?.error === "ACCOUNT_LOCKED") {
        toast.error("Account temporarily locked. Please try again later.");
      } else {
        toast.error(errorData?.message || "Login failed. Please try again.");
      }
    } else {
      toast.error("Login failed. Please check your connection and try again.");
    }
  };

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginData = {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        rememberMe: data.rememberMe,
      };

      const result = await loginUser(loginData).unwrap();

      if (result.success && result.data) {
        // Dispatch credentials to Redux store
        dispatch(
          setCredentials({
            user: result.data.user,
            tokens: result.data.tokens,
          })
        );

        // Reset form on success
        reset();
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error: unknown) {
      handleApiError(error as ErrorResponse | { message: string });
    }
  };

  // Handle social login (placeholder)
  const handleSocialLogin = (provider: string) => {
    toast.success(`${provider} login will be available soon!`);
  };

  return (
    <Background>
      <AuthCard>
        <Title>Welcome Back!</Title>
        <Subtitle>Sign in to continue your influencer journey</Subtitle>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          {/* Email Input */}
          <InputGroup hasError={!!errors.email}>
            <Mail size={20} color={sharedTheme.colorVariants.secondary.light} />
            <StyledInput
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </InputGroup>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          {/* Password Input */}
          <InputGroup hasError={!!errors.password}>
            <Lock size={20} color={sharedTheme.colorVariants.secondary.light} />
            <StyledInput
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff
                  size={20}
                  color={sharedTheme.colorVariants.secondary.light}
                />
              ) : (
                <Eye
                  size={20}
                  color={sharedTheme.colorVariants.secondary.light}
                />
              )}
            </PasswordToggle>
          </InputGroup>
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          {/* Remember Me & Forgot Password */}
          <FormFooter>
            <RememberMeContainer>
              <input
                {...register("rememberMe")}
                type="checkbox"
                id="rememberMe"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </RememberMeContainer>
            <ForgotPassword onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </ForgotPassword>
          </FormFooter>

          {/* Submit Button */}
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <ButtonLoader color="white" size="md" /> : "Sign In"}
          </SubmitButton>
        </form>

        {/* Sign Up Link */}
        <SignUpPrompt>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              cursor: "pointer",
              color: sharedTheme.colorVariants.primary.light,
              fontWeight: "bold",
            }}
          >
            Sign up here
          </span>
        </SignUpPrompt>

        {/* Social Login Divider */}
        <DividerText>
          <span>Or sign in with</span>
        </DividerText>

        {/* Social Login Buttons */}
        <IconRow>
          <InteractiveIcon
            variant="facebook"
            onClick={() => handleSocialLogin("Facebook")}
          >
            <Facebook size={20} />
          </InteractiveIcon>
          <InteractiveIcon
            variant="instagram"
            onClick={() => handleSocialLogin("Instagram")}
          >
            <Instagram size={20} />
          </InteractiveIcon>
          <InteractiveIcon
            variant="gmail"
            onClick={() => handleSocialLogin("Google")}
          >
            <MailIcon size={20} />
          </InteractiveIcon>
        </IconRow>

        {/* Debug Info (Development only) */}
        {/* {process.env.NODE_ENV === "development" && (
          <DebugInfo>
            <small>
              Auth Status:{" "}
              {authState.isAuthenticated
                ? "Authenticated"
                : "Not authenticated"}
              {authState.error && <div>Error: {authState.error}</div>}
            </small>
          </DebugInfo>
        )} */}
      </AuthCard>
    </Background>
  );
};

export default LoginInfluencer;

// Styled Components
const Background = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${sharedTheme.extendedDesignTokens?.gradients?.auth ||
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: url("https://ik.imagekit.io/i3divn77k/MVP/authBG.png?updatedAt=1746276592750")
      center/cover no-repeat;
    opacity: 0.4;
    z-index: 0;
  }
`;

export const AuthCard = styled.div`
  position: relative;
  z-index: 1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.md};
  align-items: center;
  justify-content: center;
  border-radius: ${sharedTheme.borderRadius.xl};
  box-shadow: ${sharedTheme.shadows.custom};
  padding: ${sharedTheme.spacing.xl};
  max-width: 450px;
  width: 90%;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  max-height: 90vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

const Title = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  text-align: center;
  margin-bottom: ${sharedTheme.spacing.xs};
`;

const Subtitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  margin-bottom: ${sharedTheme.spacing.md};
`;

export const InputGroup = styled.div<{ hasError?: boolean }>`
  width: 100%;
  border-radius: ${sharedTheme.borderRadius.md};
  background-color: ${sharedTheme.components.input.backgroundColor};
  display: flex;
  align-items: center;
  padding: ${sharedTheme.spacing.xs};
  gap: ${sharedTheme.spacing.xs};
  margin-bottom: ${sharedTheme.spacing.sm};
  border: 2px solid
    ${(props) =>
      props.hasError ? sharedTheme.colorVariants.error.light : "transparent"};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${sharedTheme.colorVariants.primary.light};
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: ${sharedTheme.spacing.xs};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  border: none;
  outline: none;
  background-color: transparent;
  color: ${sharedTheme.colorVariants.secondary.dark};

  &::placeholder {
    color: ${sharedTheme.colorVariants.secondary.light};
  }

  &:autofill {
    background-color: transparent !important;
  }
`;

const PasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${sharedTheme.colorVariants.secondary.light}20;
  }
`;

const ErrorText = styled.div`
  color: ${sharedTheme.colorVariants.error.light};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  margin-top: -${sharedTheme.spacing.xs};
  margin-bottom: ${sharedTheme.spacing.sm};
  padding-left: ${sharedTheme.spacing.xs};
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${sharedTheme.spacing.sm};
  font-size: ${sharedTheme.typography.fontSizes.xs};
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${sharedTheme.spacing.xs};

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const ForgotPassword = styled.button`
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.primary.light};
  cursor: pointer;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${sharedTheme.spacing.sm} 0;
  border-radius: ${sharedTheme.borderRadius.md};
  border: none;
  cursor: pointer;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${sharedTheme.components.button.colors.dark.background};
  color: ${sharedTheme.components.button.colors.default.text};
  transition: background-color 0.2s ease;
  margin-bottom: ${sharedTheme.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${sharedTheme.components.button.colors.dark
      .disabledBackground};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SignUpPrompt = styled.div`
  text-align: center;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  /* margin-bottom: ${sharedTheme.spacing.lg}; */
`;

const DividerText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${sharedTheme.colorVariants.secondary.light};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  gap: ${sharedTheme.spacing.sm};
  margin: ${sharedTheme.spacing.sm} 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: ${sharedTheme.colorVariants.secondary.light};
  }

  span {
    padding: 0 ${sharedTheme.spacing.sm};
    white-space: nowrap;
  }
`;

const IconRow = styled.div`
  display: flex;
  width: 100%;
  gap: ${sharedTheme.spacing.xl};
  justify-content: center;
  align-items: center;
`;

const InteractiveIcon = styled.div<{
  variant: "facebook" | "instagram" | "gmail";
}>`
  padding: 12px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-color: ${({ variant }) =>
    variant === "facebook"
      ? "#1877F2"
      : variant === "instagram"
      ? "#E4405F"
      : "#EA4335"};
  color: ${({ variant }) =>
    variant === "facebook"
      ? "#1877F2"
      : variant === "instagram"
      ? "#E4405F"
      : "#EA4335"};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "facebook"
        ? "#1877F2"
        : variant === "instagram"
        ? "#E4405F"
        : "#EA4335"};
    color: white;
    transform: translateY(-1px);
  }
`;
