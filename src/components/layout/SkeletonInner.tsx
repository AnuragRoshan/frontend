// components/loaders/SkeletonInner.tsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { sharedTheme } from "../../styles/theme/theme";

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

const InnerLoader = styled.div`
  border-radius: ${sharedTheme.borderRadius.sm};
  height: 12px;
  width: 100%;
  margin: ${sharedTheme.spacing.xs} 0;
  background-color: ${sharedTheme.colorVariants.secondary.light};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonInner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...rest
}) => {
  return <InnerLoader {...rest} />;
};

export default SkeletonInner;
