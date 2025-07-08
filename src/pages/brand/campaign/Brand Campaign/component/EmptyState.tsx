// components/EmptyState.tsx
import React from "react";
import styled from "styled-components";
import { Briefcase, Plus } from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { ActionButton } from "../shared/ActionButton";

interface EmptyStateProps {
  isFiltered: boolean;
  onCreateCampaign: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered,
  onCreateCampaign,
}) => {
  return (
    <EmptyStateContainer>
      <EmptyStateIcon>
        <Briefcase size={48} />
      </EmptyStateIcon>
      <EmptyStateTitle>No campaigns found</EmptyStateTitle>
      <EmptyStateDescription>
        {isFiltered
          ? "Try adjusting your filters to find the campaigns you're looking for"
          : "Create your first campaign to get started with influencer marketing"}
      </EmptyStateDescription>
      {!isFiltered && (
        <ActionButton primary onClick={onCreateCampaign}>
          <Plus size={16} />
          Create Your First Campaign
        </ActionButton>
      )}
    </EmptyStateContainer>
  );
};

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin: 2rem 0;
`;

const EmptyStateIcon = styled.div`
  margin-bottom: 1rem;
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const EmptyStateTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0 0 0.5rem 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const EmptyStateDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0 0 2rem 0;
  max-width: 400px;
`;
