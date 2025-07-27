// components/auth/LoginBrand.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  Mail as MailIcon,
  Lock as LockIcon,
  Eye,
  EyeOff,
  Building2 as BuildingIcon,
} from "lucide-react";
import { sharedTheme } from "../../styles/theme/theme";
import ButtonLoader from "../Loader/ButtonLoader";
import { InputGroup, StyledInput } from "./LoginInfluencer";

const LoginBrand: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate API call
    try {
      // Add your brand login logic here
      console.log("Brand login attempt:", formData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // On successful login, navigate to brand dashboard
      navigate("/brand/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background>
      <AuthCard>
        <LogoSection>
          <BuildingIcon
            size={40}
            color={sharedTheme.colorVariants.primary.light}
          />
        </LogoSection>

        <Title>Welcome Back</Title>
        <Subtitle>Sign in to your brand account to continue</Subtitle>

        <div
          style={{
            width: "100%",
            gap: sharedTheme.spacing.sm,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Email Input */}
          <InputGroup>
            <MailIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <StyledInput
              type="email"
              placeholder="Brand Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </InputGroup>

          {/* Password Input */}
          <InputGroup>
            <LockIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <StyledInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <PasswordToggle
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
          </InputGroup>

          {/* Forgot Password & Sign Up Links */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: sharedTheme.spacing.xs,
            }}
          >
            <ForgotPassword>
              <span
                onClick={() => navigate("/forgot-password")}
                style={{
                  cursor: "pointer",
                  color: sharedTheme.colorVariants.primary.light,
                }}
              >
                Forgot Password?
              </span>
            </ForgotPassword>
            <ForgotPassword>
              Don't have a brand account?
              <span
                onClick={() => navigate("/brand/signup")}
                style={{
                  cursor: "pointer",
                  color: sharedTheme.colorVariants.primary.light,
                }}
              >
                {" "}
                Register your brand here
              </span>
            </ForgotPassword>
          </div>
        </div>

        {/* Submit Button */}
        <SubmitButton
          onClick={!isLoading ? handleSubmit : undefined}
          isLoading={isLoading}
        >
          {isLoading ? (
            <ButtonLoader color="white" size="md" />
          ) : (
            "Sign In to Dashboard"
          )}
        </SubmitButton>

        {/* Switch to Influencer */}
        <SwitchAccountType>
          Are you an influencer?{" "}
          <span
            onClick={() => navigate("/influencer/login")}
            style={{
              cursor: "pointer",
              color: sharedTheme.colorVariants.primary.light,
              fontWeight: "600",
            }}
          >
            Sign in here
          </span>
        </SwitchAccountType>
      </AuthCard>
    </Background>
  );
};

export default LoginBrand;

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

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: ${sharedTheme.colorVariants.primary.light}15;
  border-radius: ${sharedTheme.borderRadius.full};
  margin-bottom: ${sharedTheme.spacing.sm};
`;

const Title = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: -${sharedTheme.spacing.xs};
  text-align: center;
`;

const PasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${sharedTheme.colorVariants.secondary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const ForgotPassword = styled.div`
  width: 100%;
  text-align: left;
  font-size: ${sharedTheme.typography.fontSizes.xs};
`;

const SubmitButton = styled.div<{ isLoading?: boolean }>`
  width: 100%;
  height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${sharedTheme.spacing.sm} 0;
  border-radius: ${sharedTheme.borderRadius.md};
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: ${sharedTheme.components.button.colors.dark.background};
  color: ${sharedTheme.components.button.colors.default.text};
  opacity: ${(props) => (props.isLoading ? 0.7 : 1)};

  &:hover {
    background-color: ${(props) =>
      props.isLoading
        ? sharedTheme.components.button.colors.dark.background
        : sharedTheme.components.button.colors.dark.disabledBackground};
  }
`;

const SwitchAccountType = styled.div`
  width: 100%;
  text-align: center;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: ${sharedTheme.spacing.md};
  padding-top: ${sharedTheme.spacing.sm};
  border-top: 1px solid ${sharedTheme.colorVariants.secondary.light}20;
`;
