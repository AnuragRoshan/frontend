import React from "react";
import styled from "styled-components";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { getPlatformIcon } from "../utils/campaign.utils";

interface PlatformBadgeProps {
  platform: string;
  children: React.ReactNode;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platform,
  children,
}) => {
  const IconComponent = getPlatformIcon(platform);

  return (
    <StyledPlatformBadge>
      <IconComponent size={16} />
      {children}
    </StyledPlatformBadge>
  );
};

const StyledPlatformBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
`;
