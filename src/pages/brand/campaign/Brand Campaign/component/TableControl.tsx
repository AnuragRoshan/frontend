// components/TableControls.tsx
import React from "react";
import styled from "styled-components";
import { Copy, Trash2 } from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { ActionButton } from "../shared/ActionButton";
import { ViewMode } from "../types/campaign.types";

interface TableControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedCampaigns: string[];
  onBulkAction: (action: "duplicate" | "delete") => void;
  totalResults: number;
  currentResults: number;
}

export const TableControls: React.FC<TableControlsProps> = ({
  viewMode,
  onViewModeChange,
  selectedCampaigns,
  onBulkAction,
  totalResults,
  currentResults,
}) => {
  return (
    <TableControlsContainer>
      <TableControlsLeft>
        <ViewToggle>
          <ViewButton
            active={viewMode === "table"}
            onClick={() => onViewModeChange("table")}
          >
            Table
          </ViewButton>
          <ViewButton
            active={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
          >
            Grid
          </ViewButton>
        </ViewToggle>
        {selectedCampaigns.length > 0 && (
          <BulkActions>
            <span>{selectedCampaigns.length} selected</span>
            <ActionButton small onClick={() => onBulkAction("duplicate")}>
              <Copy size={14} />
              Duplicate
            </ActionButton>
            <ActionButton small onClick={() => onBulkAction("delete")}>
              <Trash2 size={14} />
              Delete
            </ActionButton>
          </BulkActions>
        )}
      </TableControlsLeft>
      <TableControlsRight>
        <ResultsInfo>
          Showing {currentResults} of {totalResults} campaigns
        </ResultsInfo>
      </TableControlsRight>
    </TableControlsContainer>
  );
};

const TableControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TableControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TableControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

interface ViewButtonProps {
  active: boolean;
}

const ViewButton = styled.button<ViewButtonProps>`
  padding: 0.5rem 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark : "transparent"};
  border: none;
  color: ${(props) =>
    props.active ? "white" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#f9fafb"};
  }
`;

const BulkActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: ${sharedTheme.colorVariants.primary.dark}10;
  border: 1px solid ${sharedTheme.colorVariants.primary.dark}30;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const ResultsInfo = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;
