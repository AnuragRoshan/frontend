// shared/ActionButton.tsx
import React from "react";
import styled from "styled-components";
import { sharedTheme } from "../../../../../styles/theme/theme";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  small?: boolean;
  primary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  small = false,
  primary = false,
  danger = false,
  disabled = false,
}) => {
  return (
    <StyledActionButton
      onClick={onClick}
      small={small}
      primary={primary}
      danger={danger}
      disabled={disabled}
    >
      {children}
    </StyledActionButton>
  );
};

const StyledActionButton = styled.button<{
  small: boolean;
  primary: boolean;
  danger: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${(props) => (props.small ? "0.375rem 0.75rem" : "0.5rem 1rem")};
  background-color: ${(props) =>
    props.danger
      ? "#ef4444"
      : props.primary
      ? sharedTheme.colorVariants.primary.dark
      : "#f9fafb"};
  border: 1px solid
    ${(props) =>
      props.danger
        ? "#ef4444"
        : props.primary
        ? sharedTheme.colorVariants.primary.dark
        : "#e5e7eb"};
  border-radius: 8px;
  font-size: ${(props) =>
    props.small
      ? sharedTheme.typography.fontSizes.xs
      : sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${(props) =>
    props.primary || props.danger
      ? "white"
      : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.danger
        ? "#dc2626"
        : props.primary
        ? sharedTheme.colorVariants.primary.light
        : "#f3f4f6"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
