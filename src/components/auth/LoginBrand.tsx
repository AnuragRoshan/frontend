import { useState } from "react";
import styled from "styled-components";
import { sharedTheme } from "../../styles/theme/theme";
import { MailIcon, LockIcon } from "lucide-react";
import ButtonLoader from "../Loader/ButtonLoader";
import { useNavigate } from "react-router-dom";

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
    background: url("https://ik.imagekit.io/i3divn77k/MVP/authBG.png?updatedAt=1746276592750")
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
  max-width: 400px;
  width: 25%;
  margin: 0 auto;
  backdrop-filter: blur(10px);
`;

const LoginBrand = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Background>
      <AuthCard>
        <Title>
          Welcome Back <br /> Brand Partner
        </Title>
        <Subtitle>Manage your campaigns and insights with ease.</Subtitle>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: sharedTheme.spacing.sm,
            width: "90%",
          }}
        >
          <InputGroup>
            <MailIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <StyledInput type="text" placeholder="Email" />
          </InputGroup>
          <InputGroup>
            <LockIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <StyledInput type="password" placeholder="Password" />
          </InputGroup>
          <ForgotPassword>Forgot password?</ForgotPassword>
          <ForgotPassword>
            Influencer ?
            <span
              onClick={() => {
                navigate("/login");
              }}
              style={{
                cursor: "pointer",
                color: sharedTheme.colorVariants.primary.light,
              }}
            >
              {" "}
              Login here
            </span>
          </ForgotPassword>
        </div>
        <SubmitButton onClick={() => setIsLoading((prev) => !prev)}>
          {isLoading ? (
            <ButtonLoader color="white" size={"md"} />
          ) : (
            "Get Started"
          )}
        </SubmitButton>
      </AuthCard>
    </Background>
  );
};

export default LoginBrand;

const Title = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
`;

const Subtitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: -${sharedTheme.spacing.xs};
  text-align: center;
`;

const InputGroup = styled.div`
  width: 98%;
  border-radius: ${sharedTheme.borderRadius.md};
  background-color: ${sharedTheme.components.input.backgroundColor};
  display: flex;
  align-items: center;
  padding: ${sharedTheme.spacing.xs};
  gap: ${sharedTheme.spacing.xs};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${sharedTheme.spacing.xs};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  border: none;
  outline: none;
  background-color: transparent;
`;

const ForgotPassword = styled.div`
  width: 100%;
  text-align: left;
  font-size: ${sharedTheme.typography.fontSizes.xs};
`;

const SubmitButton = styled.div`
  width: 91%;
  height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${sharedTheme.spacing.sm} 0;
  border-radius: ${sharedTheme.borderRadius.md};
  cursor: pointer;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: ${sharedTheme.components.button.colors.dark.background};
  color: ${sharedTheme.components.button.colors.default.text};

  &:hover {
    background-color: ${sharedTheme.components.button.colors.dark
      .disabledBackground};
  }
`;
