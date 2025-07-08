// components/QuickFilters.tsx
import React from "react";
import styled from "styled-components";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { Campaign, FilterState } from "../types/campaign.types";

interface QuickFiltersProps {
  campaigns: Campaign[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  campaigns,
  filters,
  onFilterChange,
}) => {
  const quickFilterOptions = [
    {
      key: "all",
      label: `All Campaigns (${campaigns.length})`,
      active: filters.status === "all",
    },
    {
      key: "live",
      label: `Live (${campaigns.filter((c) => c.status === "live").length})`,
      active: filters.status === "live",
    },
    {
      key: "draft",
      label: `Draft (${campaigns.filter((c) => c.status === "draft").length})`,
      active: filters.status === "draft",
    },
    {
      key: "ended",
      label: `Ended (${campaigns.filter((c) => c.status === "ended").length})`,
      active: filters.status === "ended",
    },
  ];

  const handleQuickFilter = (status: string) => {
    onFilterChange({
      ...filters,
      status,
    });
  };

  return (
    <QuickFiltersContainer>
      {quickFilterOptions.map((option) => (
        <QuickFilterPill
          key={option.key}
          active={option.active}
          onClick={() => handleQuickFilter(option.key)}
        >
          {option.label}
        </QuickFilterPill>
      ))}
    </QuickFiltersContainer>
  );
};

const QuickFiltersContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

interface QuickFilterPillProps {
  active: boolean;
}

const QuickFilterPill = styled.button<QuickFilterPillProps>`
  padding: 0.5rem 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark : "white"};
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 8px;
  color: ${(props) =>
    props.active ? "white" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.secondary.light : "#f9fafb"};
  }
`;
