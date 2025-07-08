// components/CampaignTable.tsx
import React from "react";
import styled from "styled-components";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  MoreHorizontal,
  Copy,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { ActionButton } from "../shared/ActionButton";
import { StatusBadge } from "../shared/StatusBadge";
import { PlatformBadge } from "../shared/PlatformBadge";
import { Campaign, SortConfig } from "../types/campaign.types";
import { formatNumber } from "../utils/campaign.utils";

interface CampaignTableProps {
  campaigns: Campaign[];
  selectedCampaigns: string[];
  sortConfig: SortConfig | null;
  onSort: (key: keyof Campaign) => void;
  onSelectCampaign: (campaignId: string) => void;
  onSelectAll: () => void;
  onViewDetails: (campaign: Campaign) => void;
  onEditCampaign: (campaign: Campaign) => void;
  onDeleteCampaign: (campaign: Campaign) => void;
}

export const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  selectedCampaigns,
  sortConfig,
  onSort,
  onSelectCampaign,
  onSelectAll,
  onViewDetails,
  onEditCampaign,
  onDeleteCampaign,
}) => {
  const getSortIcon = (key: keyof Campaign) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowUp size={14} />
      ) : (
        <ArrowDown size={14} />
      );
    }
    return <ArrowUpDown size={14} />;
  };

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                checked={selectedCampaigns.length === campaigns.length}
                onChange={onSelectAll}
              />
            </TableHeaderCell>
            <TableHeaderCell onClick={() => onSort("name")}>
              <SortableHeader>
                Campaign Name
                <SortIcon>{getSortIcon("name")}</SortIcon>
              </SortableHeader>
            </TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell onClick={() => onSort("startDate")}>
              <SortableHeader>
                Start Date
                <SortIcon>{getSortIcon("startDate")}</SortIcon>
              </SortableHeader>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => onSort("endDate")}>
              <SortableHeader>
                End Date
                <SortIcon>{getSortIcon("endDate")}</SortIcon>
              </SortableHeader>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => onSort("budget")}>
              <SortableHeader>
                Budget
                <SortIcon>{getSortIcon("budget")}</SortIcon>
              </SortableHeader>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => onSort("influencers")}>
              <SortableHeader>
                Influencers
                <SortIcon>{getSortIcon("influencers")}</SortIcon>
              </SortableHeader>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => onSort("spent")}>
              <SortableHeader>
                Spent
                <SortIcon>{getSortIcon("spent")}</SortIcon>
              </SortableHeader>
            </TableHeaderCell>
            <TableHeaderCell>Performance</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>
                <Checkbox
                  checked={selectedCampaigns.includes(campaign.id)}
                  onChange={() => onSelectCampaign(campaign.id)}
                />
              </TableCell>
              <TableCell>
                <CampaignInfo>
                  <CampaignName onClick={() => onViewDetails(campaign)}>
                    {campaign.name}
                  </CampaignName>
                  <CampaignMeta>
                    <PlatformBadge platform={campaign.platform}>
                      {campaign.platform}
                    </PlatformBadge>
                    <CategoryBadge>{campaign.category}</CategoryBadge>
                  </CampaignMeta>
                </CampaignInfo>
              </TableCell>
              <TableCell>
                <StatusBadge status={campaign.status}>
                  {campaign.status}
                </StatusBadge>
              </TableCell>
              <TableCell>
                {new Date(campaign.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(campaign.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>₹{formatNumber(campaign.budget)}</TableCell>
              <TableCell>{campaign.influencers}</TableCell>
              <TableCell>
                <SpentInfo>
                  <SpentAmount>₹{formatNumber(campaign.spent)}</SpentAmount>
                  <SpentPercentage>
                    {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                  </SpentPercentage>
                </SpentInfo>
              </TableCell>
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
                <ActionButtons>
                  <ActionButton small onClick={() => onViewDetails(campaign)}>
                    <Eye size={14} />
                  </ActionButton>
                  {(campaign.status === "draft" ||
                    campaign.status === "live") && (
                    <ActionButton
                      small
                      onClick={() => onEditCampaign(campaign)}
                    >
                      <Edit size={14} />
                    </ActionButton>
                  )}
                  <DropdownMenu
                    campaign={campaign}
                    onDelete={onDeleteCampaign}
                  />
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Dropdown Menu Component
interface DropdownMenuProps {
  campaign: Campaign;
  onDelete: (campaign: Campaign) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ campaign, onDelete }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownContainer>
      <ActionButton small onClick={() => setIsOpen(!isOpen)}>
        <MoreHorizontal size={14} />
      </ActionButton>
      {isOpen && (
        <DropdownContent>
          <DropdownItem onClick={() => setIsOpen(false)}>
            <Eye size={14} />
            View Details
          </DropdownItem>
          <DropdownItem onClick={() => setIsOpen(false)}>
            <Copy size={14} />
            Duplicate
          </DropdownItem>
          <DropdownItem onClick={() => setIsOpen(false)}>
            <ExternalLink size={14} />
            Share Link
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem danger onClick={() => onDelete(campaign)}>
            <Trash2 size={14} />
            Delete
          </DropdownItem>
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};

// Styled Components
const TableContainer = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f9fafb;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  text-align: left;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  vertical-align: top;
`;

const TableBody = styled.tbody``;

const SortableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CampaignInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CampaignName = styled.button`
  background: none;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;
  text-align: left;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const CampaignMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryBadge = styled.div`
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.light};
  background-color: #f3f4f6;
  border-radius: 4px;
`;

const SpentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SpentAmount = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const SpentPercentage = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PerformanceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PerformanceMetric = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 160px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 0.5rem 0;
`;

interface DropdownItemProps {
  danger?: boolean;
}

const DropdownItem = styled.button<DropdownItemProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${(props) =>
    props.danger ? "#ef4444" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #f9fafb;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.5rem 0;
`;
