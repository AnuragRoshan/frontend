// components/loaders/SkeletonTop.tsx
import React from "react";
import styled from "styled-components";
import { sharedTheme } from "../../styles/theme/theme";

// const shimmer = keyframes`
//   0% { background-position: -200px 0; }
//   100% { background-position: calc(200px + 100%) 0; }
// `;

const TopLoader = styled.div`
  border-radius: ${sharedTheme.borderRadius.md};
  background-color: #ccd5e2;
  overflow: hidden;
  padding: ${sharedTheme.spacing.md};
  max-width: 100%;
  box-sizing: border-box;
`;

interface SkeletonTopProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SkeletonTop: React.FC<SkeletonTopProps> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <TopLoader style={style} {...rest}>
      {children}
    </TopLoader>
  );
};

export default SkeletonTop;
