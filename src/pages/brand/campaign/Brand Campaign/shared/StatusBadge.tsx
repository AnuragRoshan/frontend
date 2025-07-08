// shared/StatusBadge.tsx
import React from "react";
import styled from "styled-components";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { getStatusColor } from "../utils/campaign.utils";

interface StatusBadgeProps {
  status: string;
  children: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
}) => {
  return <StyledStatusBadge status={status}>{children}</StyledStatusBadge>;
};

const StyledStatusBadge = styled.div<{ status: string }>`
  padding: 0.25rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: white;
  border-radius: 6px;
  background-color: ${(props) => getStatusColor(props.status)};
  text-transform: capitalize;
`;
