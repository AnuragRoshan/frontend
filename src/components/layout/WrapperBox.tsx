import React from "react";
import styled from "styled-components";
import { sharedTheme } from "../../styles/theme/theme";

// Mapping for theme variants
const backgroundThemes: Record<string, string> = {
  gradiantBlue: sharedTheme.extendedDesignTokens.gradients.lightBlue,
  white: "#ffffff",
  grey: "#f5f5f5",
  // Add more if needed
};

const Box = styled.div<{ themeVariant?: string }>`
  box-sizing: border-box;
  padding: ${sharedTheme.spacing.lg};

  background: ${({ style, themeVariant }) =>
    style?.background ||
    (themeVariant && backgroundThemes[themeVariant]) ||
    backgroundThemes.white}; // default to white

  border-radius: ${sharedTheme.borderRadius.md};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  width: 100%;
  border: 1px solid #b3b3b32c;
`;

interface WrapperBoxProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  themeVariant?: string; // new prop
}

const WrapperBox: React.FC<WrapperBoxProps> = ({
  children,
  style,
  themeVariant,
}) => {
  return (
    <Box style={style} themeVariant={themeVariant}>
      {children}
    </Box>
  );
};

export default WrapperBox;
