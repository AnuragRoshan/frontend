// src/components/auth/SignUpInfluencer.tsx
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { sharedTheme } from "../../styles/theme/theme";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  AtSignIcon,
  Link2Icon,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import ButtonLoader from "../Loader/ButtonLoader";
import { useRegisterUserMutation } from "../../store/api/authApi";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/slices/authSlices"; // Fixed: removed 's' from authSlices
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Validation schema
const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

    email: z.string().email("Please enter a valid email address").toLowerCase(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    confirmPassword: z.string(),

    username: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || (val.length >= 3 && val.length <= 30),
        "Username must be 3-30 characters if provided"
      )
      .refine(
        (val) => !val || /^[a-zA-Z0-9_]+$/.test(val),
        "Username can only contain letters, numbers and underscores"
      ),

    socialPlatform: z
      .enum(["instagram", "youtube", "tiktok", "twitter"], {
        errorMap: () => ({ message: "Please select a social platform" }),
      })
      .optional(),

    socialHandle: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || val.length <= 50,
        "Social handle must be less than 50 characters"
      ),

    termsAccepted: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

// Error response interface for proper typing
interface ErrorResponse {
  data?: {
    success: boolean;
    message: string;
    error?: string;
    details?: Record<string, unknown>;
  };
  status?: number;
}

const SignupInfluencer = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redux hooks
  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();
  const authState = useAppSelector(selectAuth);

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      socialPlatform: undefined,
      socialHandle: "",
      termsAccepted: false,
    },
  });

  // Watch for social platform changes
  const selectedPlatform = watch("socialPlatform");

  // Handle successful registration
  useEffect(() => {
    if (
      authState.isAuthenticated &&
      authState.registrationStep === "verification"
    ) {
      toast.success(
        "Registration successful! Please check your email for verification."
      );
      navigate("/verify-email");
    } else if (
      authState.isAuthenticated &&
      authState.registrationStep === "completed"
    ) {
      toast.success("Welcome! Your account has been created successfully.");
      navigate("/dashboard");
    }
  }, [authState.isAuthenticated, authState.registrationStep, navigate]);

  // Helper function to handle API errors
  const handleApiError = (error: FetchBaseQueryError | { message: string }) => {
    console.error("Registration error:", error);

    if ("data" in error) {
      const errorResponse = error as ErrorResponse;
      const errorData = errorResponse.data;

      if (errorData?.error === "EMAIL_EXISTS") {
        toast.error(
          "An account with this email already exists. Please use a different email or try logging in."
        );
      } else if (errorData?.error === "USERNAME_EXISTS") {
        toast.error(
          "This username is already taken. Please choose a different one."
        );
      } else if (errorData?.error === "INVALID_EMAIL") {
        toast.error("Please enter a valid email address.");
      } else if (errorData?.error === "WEAK_PASSWORD") {
        toast.error("Password is too weak. Please choose a stronger password.");
      } else {
        toast.error(
          errorData?.message || "Registration failed. Please try again."
        );
      }
    } else {
      toast.error(
        "message" in error
          ? error.message
          : "Registration failed. Please try again."
      );
    }
  };

  // Handle form submission
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const registerData = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        password: data.password,
        userType: "influencer" as const,
        confirmPassword: data.confirmPassword,
        username: data.username?.trim() || undefined,
        socialAccount:
          data.socialPlatform && data.socialHandle
            ? {
                platform: data.socialPlatform,
                handle: data.socialHandle.replace(/^@/, ""), // Remove @ if present
              }
            : undefined,
        termsAccepted: data.termsAccepted,
        privacyAccepted: data.termsAccepted,
      };

      const result = await registerUser(registerData).unwrap();

      if (result.success) {
        // Success is handled by the useEffect hook above
        reset();
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const getSocialPlatformLabel = (platform: string): string => {
    const labels: Record<string, string> = {
      instagram: "Instagram",
      youtube: "YouTube",
      tiktok: "TikTok",
      twitter: "Twitter/X",
    };
    return labels[platform] || platform;
  };

  return (
    <Background>
      <AuthCard>
        <Title>Sign up to get started</Title>
        <Subtitle>
          Create your account and unlock exclusive opportunities.
        </Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <InputGroup hasError={!!errors.firstName}>
            <UserIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type="text"
                  placeholder="First Name"
                  hasError={!!errors.firstName}
                />
              )}
            />
          </InputGroup>
          {errors.firstName && (
            <ErrorMessage>
              <AlertCircle size={14} />
              {errors.firstName.message}
            </ErrorMessage>
          )}

          {/* Last Name */}
          <InputGroup hasError={!!errors.lastName}>
            <UserIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type="text"
                  placeholder="Last Name"
                  hasError={!!errors.lastName}
                />
              )}
            />
          </InputGroup>
          {errors.lastName && (
            <ErrorMessage>
              <AlertCircle size={14} />
              {errors.lastName.message}
            </ErrorMessage>
          )}

          {/* Email */}
          <InputGroup hasError={!!errors.email}>
            <MailIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type="email"
                  placeholder="Email Address"
                  hasError={!!errors.email}
                />
              )}
            />
          </InputGroup>
          {errors.email && (
            <ErrorMessage>
              <AlertCircle size={14} />
              {errors.email.message}
            </ErrorMessage>
          )}

          {/* Password */}
          <InputGroup hasError={!!errors.password}>
            <LockIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  hasError={!!errors.password}
                />
              )}
            />
            <PasswordToggle
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
          </InputGroup>
          {errors.password && (
            <ErrorMessage>
              <AlertCircle size={14} />
              {errors.password.message}
            </ErrorMessage>
          )}

          {/* Confirm Password */}
          <InputGroup hasError={!!errors.confirmPassword}>
            <LockIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  hasError={!!errors.confirmPassword}
                />
              )}
            />
            <PasswordToggle
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
          </InputGroup>
          {errors.confirmPassword && (
            <ErrorMessage>
              <AlertCircle size={14} />
              {errors.confirmPassword.message}
            </ErrorMessage>
          )}

          {/* Username (Optional) */}
          <InputGroup hasError={!!errors.username}>
            <AtSignIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type="text"
                  placeholder="Username (optional)"
                  hasError={!!errors.username}
                />
              )}
            />
          </InputGroup>
          {errors.username && (
            <ErrorMessage>
              <AlertCircle size={14} />
              {errors.username.message}
            </ErrorMessage>
          )}

          {/* Social Platform & Handle */}
          <SocialInputGroup
            hasError={!!(errors.socialPlatform || errors.socialHandle)}
          >
            <Link2Icon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <Controller
              name="socialPlatform"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  {...field}
                  value={field.value || ""}
                  hasError={!!errors.socialPlatform}
                >
                  <option value="">Select Platform</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitter">Twitter/X</option>
                </StyledSelect>
              )}
            />
            {selectedPlatform && (
              <Controller
                name="socialHandle"
                control={control}
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    type="text"
                    placeholder={`@${getSocialPlatformLabel(
                      selectedPlatform
                    )} handle`}
                    hasError={!!errors.socialHandle}
                  />
                )}
              />
            )}
          </SocialInputGroup>
          {(errors.socialPlatform || errors.socialHandle) && (
            <ErrorMessage>
              <AlertCircle size={14} />
              {errors.socialPlatform?.message || errors.socialHandle?.message}
            </ErrorMessage>
          )}

          {/* Terms and Conditions */}
          <CheckboxRow>
            <Controller
              name="termsAccepted"
              control={control}
              render={({ field }) => (
                <StyledCheckbox
                  type="checkbox"
                  id="terms"
                  checked={field.value}
                  onChange={field.onChange}
                  hasError={!!errors.termsAccepted}
                />
              )}
            />
            <CheckboxLabel htmlFor="terms">
              I accept the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </CheckboxLabel>
          </CheckboxRow>
          {errors.termsAccepted && (
            <ErrorMessage>
              <AlertCircle size={14} />
              {errors.termsAccepted.message}
            </ErrorMessage>
          )}

          {/* Submit Button */}
          <SubmitButton
            type="submit"
            disabled={!isValid || isRegistering}
            isValid={isValid}
          >
            {isRegistering ? (
              <ButtonLoader color="white" size="md" />
            ) : (
              "Create Account"
            )}
          </SubmitButton>

          {/* Login Link */}
          <LoginLink>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                cursor: "pointer",
                color: sharedTheme.colorVariants.primary.light,
                fontWeight: "600",
              }}
            >
              Login here
            </span>
          </LoginLink>
        </Form>
      </AuthCard>
    </Background>
  );
};

export default SignupInfluencer;

// Styled Components
const Background = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${sharedTheme.extendedDesignTokens.gradients.auth};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: url("https://ik.imagekit.io/i3divn77k/MVP/akjdna.png?updatedAt=1746312870577")
      center/cover no-repeat;
    opacity: 0.4;
    z-index: 0;
  }
`;

const AuthCard = styled.div`
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
`;

const Title = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  text-align: center;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  margin: 0;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.sm};
`;

const InputGroup = styled.div<{ hasError?: boolean }>`
  width: 100%;
  border-radius: ${sharedTheme.borderRadius.md};
  background-color: ${sharedTheme.components.input.backgroundColor};
  display: flex;
  align-items: center;
  padding: ${sharedTheme.spacing.xs};
  gap: ${sharedTheme.spacing.xs};
  border: 2px solid ${(props) => (props.hasError ? "#ef4444" : "transparent")};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${(props) =>
      props.hasError
        ? "#ef4444"
        : sharedTheme.colorVariants.primary
            .light}; /* Fixed: changed main to light */
  }
`;

const SocialInputGroup = styled(InputGroup)`
  flex-wrap: wrap;

  select {
    min-width: 120px;
    flex: 1;
  }

  input {
    flex: 2;
    min-width: 150px;
  }
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
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

  &:focus {
    outline: none;
  }
`;

const StyledSelect = styled.select<{ hasError?: boolean }>`
  padding: ${sharedTheme.spacing.xs};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  border: none;
  outline: none;
  background-color: transparent;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  option {
    background: white;
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const PasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${sharedTheme.colorVariants.secondary.light};
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: ${sharedTheme.colorVariants.secondary.dark};
  }

  &:focus {
    outline: none;
    color: ${sharedTheme.colorVariants.primary
      .light}; /* Fixed: changed main to light */
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${sharedTheme.spacing.xs};
  margin: ${sharedTheme.spacing.sm} 0;
`;

const StyledCheckbox = styled.input<{ hasError?: boolean }>`
  margin: 0;
  margin-top: 2px;
  cursor: pointer;
  accent-color: ${sharedTheme.colorVariants.primary
    .light}; /* Fixed: changed main to light */

  &:focus {
    outline: 2px solid ${sharedTheme.colorVariants.primary.light};
    outline-offset: 2px;
  }
`;

const CheckboxLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.4;
  cursor: pointer;

  a {
    color: ${sharedTheme.colorVariants.primary
      .light}; /* Fixed: changed main to light */
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #ef4444;
  margin-top: -${sharedTheme.spacing.xs};
  margin-bottom: ${sharedTheme.spacing.xs};
`;

const SubmitButton = styled.button<{ isValid: boolean }>`
  width: 100%;
  padding: ${sharedTheme.spacing.md};
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: white;
  background: ${(props) =>
    props.isValid
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.dark};
  border: none;
  border-radius: ${sharedTheme.borderRadius.md};
  cursor: ${(props) => (props.isValid ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;

  &:hover {
    /* background: ${(props) =>
      props.isValid
        ? sharedTheme.colorVariants.primary.dark
        : sharedTheme.colorVariants.secondary.light}; */
    opacity: ${(props) => (props.isValid ? 0.9 : 1)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-top: ${sharedTheme.spacing.sm};
`;
