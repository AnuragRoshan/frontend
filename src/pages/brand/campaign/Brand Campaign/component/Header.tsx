// components/CampaignHeader.tsx
import React from "react";
import styled from "styled-components";
import { Plus, Filter } from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { ActionButton } from "../shared/ActionButton";

interface CampaignHeaderProps {
  onCreateCampaign: () => void;
  onToggleFilters: () => void;
  showFilters: boolean;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  onCreateCampaign,
  onToggleFilters,
  //   showFilters,
}) => {
  return (
    <PageHeader>
      <HeaderLeft>
        <PageTitle>Campaign Management</PageTitle>
        <PageDescription>
          Manage and track all your influencer marketing campaigns
        </PageDescription>
      </HeaderLeft>
      <HeaderRight>
        <HeaderActions>
          <ActionButton onClick={onToggleFilters}>
            <Filter size={16} />
            Filters
          </ActionButton>
          <ActionButton primary onClick={onCreateCampaign}>
            <Plus size={16} />
            Create Campaign
          </ActionButton>
        </HeaderActions>
      </HeaderRight>
    </PageHeader>
  );
};

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PageTitle = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xxxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PageDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;
