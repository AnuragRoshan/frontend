import styled from "styled-components";
import { sharedTheme } from "../../styles/theme/theme";

interface BadgeProps {
  variant?: "success" | "warning" | "info" | "default";
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const StyledBadge = styled.div<BadgeProps>`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  width: fit-content;

  background-color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return "#ECFDF5";
      case "warning":
        return "#FFFBEB";
      case "info":
        return "#EFF6FF";
      default:
        return "#F3F4F6";
    }
  }};

  color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return "#059669";
      case "warning":
        return "#D97706";
      case "info":
        return "#2563EB";
      default:
        return "#4B5563";
    }
  }};
`;

const Badge = ({ variant = "default", children, style }: BadgeProps) => {
  return (
    <StyledBadge variant={variant} style={style}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
