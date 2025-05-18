import { useState } from "react";
import styled from "styled-components";
import { sharedTheme } from "../../styles/theme/theme";
import {
  MailIcon,
  LockIcon,
  //   FacebookIcon,
  //   InstagramIcon,
  UserIcon,
  AtSignIcon,
  Link2Icon,
} from "lucide-react";
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
  max-width: 400px;
  width: 25%;
  margin: 0 auto;
  backdrop-filter: blur(10px);
`;

const SignupInfluencer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <Background>
      <AuthCard>
        <Title>Sign up to get started</Title>
        <Subtitle>
          Create your account and unlock exclusive opportunities.
        </Subtitle>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: sharedTheme.spacing.sm,
            width: "90%",
          }}
        >
          <InputGroup>
            <UserIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <StyledInput type="text" placeholder="Full Name" />
          </InputGroup>
          <InputGroup>
            <MailIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <StyledInput type="email" placeholder="Email Address" />
          </InputGroup>
          <InputGroup>
            <LockIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <StyledInput type="password" placeholder="Password" />
          </InputGroup>
          <InputGroup>
            <AtSignIcon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <StyledInput type="text" placeholder="Username (optional)" />
          </InputGroup>
          <InputGroup>
            <Link2Icon
              size={18}
              color={sharedTheme.colorVariants.secondary.dark}
            />
            <select style={{ border: "none", background: "transparent" }}>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>YouTube</option>
              <option>X</option>
            </select>
            <StyledInput type="text" placeholder=" @handle (Optional)" />
          </InputGroup>
          <CheckboxRow>
            <input type="checkbox" id="terms" required />
            <label
              htmlFor="terms"
              style={{ fontSize: sharedTheme.typography.fontSizes.xs }}
            >
              I accept the Terms & Conditions
            </label>
          </CheckboxRow>
          <ForgotPassword>
            Already have an account ?
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
            "Create Account"
          )}
        </SubmitButton>
        {/* <DividerText>
          <span>Or Sign up with</span>
        </DividerText>
        <IconRow>
          <InteractiveIcon variant="facebook">
            <FacebookIcon size={20} />
          </InteractiveIcon>
          <InteractiveIcon variant="instagram">
            <InstagramIcon size={20} />
          </InteractiveIcon>
          <InteractiveIcon variant="gmail">
            <MailIcon size={20} />
          </InteractiveIcon>
        </IconRow> */}
      </AuthCard>
    </Background>
  );
};

export default SignupInfluencer;

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

const InputGroup = styled.div`
  width: 98%;
  border-radius: ${sharedTheme.borderRadius.md};
  background-color: ${sharedTheme.components.input.backgroundColor};
  display: flex;
  align-items: center;
  padding: ${sharedTheme.spacing.xs};
  gap: ${sharedTheme.spacing.xs};
  select {
    text-decoration: none;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${sharedTheme.spacing.xs};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  border: none;
  outline: none;
  background-color: transparent;
  &::placeholder {
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

// const ForgotPassword = styled.div`
//   width: 100%;
//   text-align: right;
//   font-size: ${sharedTheme.typography.fontSizes.xs};
// `;

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

// const IconRow = styled.div`
//   display: flex;
//   width: 100%;
//   gap: ${sharedTheme.spacing.xl};
//   justify-content: center;
//   align-items: center;
// `;

// const InteractiveIcon = styled.div<{
//   variant: "facebook" | "instagram" | "gmail";
// }>`
//   padding: 8px;
//   border-radius: 50%;
//   transition: all 0.2s ease-in-out;
//   border: 2px solid transparent;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   border-color: ${({ variant }) =>
//     variant === "facebook"
//       ? sharedTheme.colorVariants.primary.dark
//       : variant === "instagram"
//       ? "#C13584"
//       : "#D93025"};
//   background-color: ${({ variant }) =>
//     variant === "facebook"
//       ? "rgba(59, 130, 246, 0.1)"
//       : variant === "instagram"
//       ? "rgba(225, 48, 108, 0.1)"
//       : "rgba(234, 67, 53, 0.1)"};
// `;

const ForgotPassword = styled.div`
  width: 100%;
  text-align: left;
  font-size: ${sharedTheme.typography.fontSizes.xs};
`;
// const DividerText = styled.div`
//   display: flex;
//   align-items: center;
//   width: 90%;
//   color: ${sharedTheme.colorVariants.secondary.dark};
//   font-size: ${sharedTheme.typography.fontSizes.sm};
//   gap: ${sharedTheme.spacing.sm};
//   margin: ${sharedTheme.spacing.sm} 0;

//   &::before,
//   &::after {
//     content: "";
//     flex: 1;
//     height: 1px;
//     background-color: ${sharedTheme.colorVariants.secondary.light};
//   }

//   span {
//     padding: 0 ${sharedTheme.spacing.sm};
//     white-space: nowrap;
//   }
// `;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${sharedTheme.spacing.xs};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  width: 100%;
`;
