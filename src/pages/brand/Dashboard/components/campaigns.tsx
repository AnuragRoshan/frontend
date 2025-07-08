import React, { useState } from "react";
import styled from "styled-components";
import { theme, formatNumber, getStatusColor } from "../theme";
import { Search, Filter, Plus, Eye, Edit, MoreHorizontal } from "lucide-react";

interface Campaign {
  id: string | number;
  name: string;
  category: string;
  status: string;
  budget: number;
  spent: number;
  influencers: number;
  impressions: number;
  engagement: number;
}

interface CampaignsSectionProps {
  campaigns: Campaign[];
}

const CampaignsSection: React.FC<CampaignsSectionProps> = ({ campaigns }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (activeFilter === "all") return true;
    return campaign.status === activeFilter;
  });

  const getStatusCount = (status: string) => {
    if (status === "all") return campaigns.length;
    return campaigns.filter((c) => c.status === status).length;
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Campaign Management</SectionTitle>
        <HeaderActions>
          <SearchBox>
            <Search size={16} />
            <input type="text" placeholder="Search campaigns..." />
          </SearchBox>
          <FilterButton>
            <Filter size={16} />
            Filter
          </FilterButton>
          <ActionButton primary>
            <Plus size={16} />
            Create Campaign
          </ActionButton>
        </HeaderActions>
      </SectionHeader>

      <CampaignFilters>
        <FilterPill
          active={activeFilter === "all"}
          onClick={() => setActiveFilter("all")}
        >
          All Campaigns ({getStatusCount("all")})
        </FilterPill>
        <FilterPill
          active={activeFilter === "running"}
          onClick={() => setActiveFilter("running")}
        >
          Running ({getStatusCount("running")})
        </FilterPill>
        <FilterPill
          active={activeFilter === "draft"}
          onClick={() => setActiveFilter("draft")}
        >
          Draft ({getStatusCount("draft")})
        </FilterPill>
        <FilterPill
          active={activeFilter === "ended"}
          onClick={() => setActiveFilter("ended")}
        >
          Ended ({getStatusCount("ended")})
        </FilterPill>
      </CampaignFilters>

      <CampaignsTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Campaign</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Budget</TableHeaderCell>
            <TableHeaderCell>Spent</TableHeaderCell>
            <TableHeaderCell>Influencers</TableHeaderCell>
            <TableHeaderCell>Performance</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCampaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>
                <CampaignInfo>
                  <CampaignName>{campaign.name}</CampaignName>
                  <CampaignCategory>{campaign.category}</CampaignCategory>
                </CampaignInfo>
              </TableCell>
              <TableCell>
                <StatusBadge status={campaign.status}>
                  {campaign.status}
                </StatusBadge>
              </TableCell>
              <TableCell>₹{formatNumber(campaign.budget)}</TableCell>
              <TableCell>
                <SpentInfo>
                  <SpentAmount>₹{formatNumber(campaign.spent)}</SpentAmount>
                  <SpentPercentage>
                    {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                  </SpentPercentage>
                </SpentInfo>
              </TableCell>
              <TableCell>{campaign.influencers}</TableCell>
              <TableCell>
                <PerformanceInfo>
                  <PerformanceMetric>
                    {formatNumber(campaign.impressions)} impressions
                  </PerformanceMetric>
                  <PerformanceMetric>
                    {campaign.engagement}% engagement
                  </PerformanceMetric>
                </PerformanceInfo>
              </TableCell>
              <TableCell>
                <TableActions>
                  <ActionButton small>
                    <Eye size={14} />
                  </ActionButton>
                  <ActionButton small>
                    <Edit size={14} />
                  </ActionButton>
                  <ActionButton small>
                    <MoreHorizontal size={14} />
                  </ActionButton>
                </TableActions>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </CampaignsTable>
    </SectionContainer>
  );
};

// Styled Components
const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  margin: 0;
  color: ${theme.colors.textPrimary};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  min-width: 200px;

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: ${theme.typography.fontSizes.sm};
    color: ${theme.colors.textPrimary};
    width: 100%;

    &::placeholder {
      color: ${theme.colors.textSecondary};
    }
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.border};
  }
`;

interface ActionButtonProps {
  primary?: boolean;
  small?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${(props) =>
    props.small
      ? `${theme.spacing.sm} ${theme.spacing.md}`
      : `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${(props) =>
    props.primary ? theme.colors.primary : theme.colors.surface};
  border: 1px solid
    ${(props) => (props.primary ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  font-size: ${(props) =>
    props.small
      ? theme.typography.fontSizes.xs
      : theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${(props) =>
    props.primary ? theme.colors.background : theme.colors.textPrimary};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? theme.colors.primaryDark : theme.colors.border};
    transform: translateY(-1px);
  }
`;

const CampaignFilters = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: ${theme.spacing.sm};
`;

interface FilterPillProps {
  active?: boolean;
}

const FilterPill = styled.button<FilterPillProps>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  background-color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.surface};
  border: 1px solid
    ${(props) => (props.active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  color: ${(props) =>
    props.active ? theme.colors.background : theme.colors.textPrimary};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? theme.colors.primaryDark : theme.colors.border};
  }
`;

const CampaignsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
`;

const TableHeader = styled.thead`
  background-color: ${theme.colors.surface};
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.border};
  }

  &:hover {
    background-color: ${theme.colors.surface};
  }
`;

const TableHeaderCell = styled.th`
  padding: ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.textPrimary};
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textPrimary};
  vertical-align: top;
`;

const CampaignInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const CampaignName = styled.div`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.textPrimary};
`;

const CampaignCategory = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = styled.div<StatusBadgeProps>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.sm};
  background-color: ${(props) => getStatusColor(props.status)};
  text-transform: capitalize;
`;

const SpentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const SpentAmount = styled.div`
  font-weight: ${theme.typography.fontWeights.semibold};
`;

const SpentPercentage = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

const PerformanceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const PerformanceMetric = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

const TableActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

export default CampaignsSection;
