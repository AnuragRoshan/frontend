import styled, { keyframes } from "styled-components";
import { sharedTheme } from "../../styles/theme/theme";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div<{
  size?: "sm" | "md" | "lg";
  color?: string;
}>`
  display: inline-block;
  width: ${({ size }) =>
    size === "sm"
      ? "10px"
      : size === "lg"
      ? "20px"
      : sharedTheme.icons.sizes.md};
  height: ${({ size }) =>
    size === "sm"
      ? "10px"
      : size === "lg"
      ? "20px"
      : sharedTheme.icons.sizes.md};
  border: 2px solid
    ${({ color }) => color || sharedTheme.colorVariants.primary.light};
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const ButtonLoader = ({
  size = "md",
  color,
}: {
  size?: "sm" | "md" | "lg";
  color?: string;
}) => {
  return <LoaderWrapper size={size} color={color} />;
};

export default ButtonLoader;
