// components/shared/ActionButton.tsx
import React from "react";
import styled from "styled-components";
import { sharedTheme } from "../../../../../styles/theme/theme";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
  primary?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "ghost";
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  disabled = false,
  small = false,
  primary = false,
  variant = "primary",
  type = "button",
  className,
}) => {
  // If primary prop is used, override variant
  const finalVariant = primary ? "primary" : variant;

  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      small={small}
      variant={finalVariant}
      type={type}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  small: boolean;
  variant: "primary" | "secondary" | "success" | "warning" | "danger" | "ghost";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: ${(props) =>
    props.small
      ? sharedTheme.typography.fontSizes.xs
      : sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-decoration: none;

  /* Size variations */
  padding: ${(props) => (props.small ? "0.375rem 0.75rem" : "0.625rem 1rem")};

  /* Variant styles */
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: ${sharedTheme.colorVariants.primary.dark};
          color: white;
          border: 1px solid ${sharedTheme.colorVariants.primary.dark};

          &:hover:not(:disabled) {
            background-color: ${sharedTheme.colorVariants.primary.darker};
            border-color: ${sharedTheme.colorVariants.primary.darker};
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(37, 99, 235, 0.3);
          }
        `;

      case "secondary":
        return `
          background-color: white;
          color: ${sharedTheme.colorVariants.secondary.dark};
          border: 1px solid #e5e7eb;

          &:hover:not(:disabled) {
            background-color: #f9fafb;
            border-color: #d1d5db;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            background-color: #f3f4f6;
          }
        `;

      case "success":
        return `
          background-color: #10b981;
          color: white;
          border: 1px solid #10b981;

          &:hover:not(:disabled) {
            background-color: #059669;
            border-color: #059669;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(16, 185, 129, 0.3);
          }
        `;

      case "warning":
        return `
          background-color: #f59e0b;
          color: white;
          border: 1px solid #f59e0b;

          &:hover:not(:disabled) {
            background-color: #d97706;
            border-color: #d97706;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(245, 158, 11, 0.3);
          }
        `;

      case "danger":
        return `
          background-color: #ef4444;
          color: white;
          border: 1px solid #ef4444;

          &:hover:not(:disabled) {
            background-color: #dc2626;
            border-color: #dc2626;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(239, 68, 68, 0.3);
          }
        `;

      case "ghost":
        return `
          background-color: transparent;
          color: ${sharedTheme.colorVariants.secondary.light};
          border: 1px solid transparent;

          &:hover:not(:disabled) {
            background-color: #f3f4f6;
            color: ${sharedTheme.colorVariants.secondary.dark};
            border-color: #e5e7eb;
          }

          &:active:not(:disabled) {
            background-color: #e5e7eb;
          }
        `;

      default:
        return `
          background-color: ${sharedTheme.colorVariants.primary.dark};
          color: white;
          border: 1px solid ${sharedTheme.colorVariants.primary.dark};
        `;
    }
  }}

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  /* Focus state */
  &:focus-visible {
    outline: 2px solid ${sharedTheme.colorVariants.primary.dark};
    outline-offset: 2px;
  }

  /* Icon sizing */
  svg {
    width: ${(props) => (props.small ? "14px" : "16px")};
    height: ${(props) => (props.small ? "14px" : "16px")};
    flex-shrink: 0;
  }
`;

export default ActionButton;
