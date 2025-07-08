import React from "react";
import styled from "styled-components";
import { theme } from "../theme";
import {
  Calendar,
  Download,
  ChevronDown,
  RefreshCw,
  Share2,
  Bell,
} from "lucide-react";

interface DashboardHeaderProps {
  dateRange: string;
  setDateRange: (range: string) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dateRange,
  setDateRange,
  showNotifications,
  setShowNotifications,
}) => {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <BrandInfo>
          <BrandLogo>
            <img
              src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
              alt="Brand Logo"
            />
          </BrandLogo>
          <BrandDetails>
            <BrandName>StyleHub Fashion</BrandName>
            <BrandTagline>Premium Fashion Brand</BrandTagline>
          </BrandDetails>
        </BrandInfo>
      </HeaderLeft>

      <HeaderRight>
        <DateRangeSelector>
          <Calendar size={16} />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="last7Days">Last 7 Days</option>
            <option value="last30Days">Last 30 Days</option>
            <option value="last90Days">Last 90 Days</option>
            <option value="lastYear">Last Year</option>
          </select>
          <ChevronDown size={14} />
        </DateRangeSelector>

        <ActionButton>
          <RefreshCw size={16} />
          Refresh
        </ActionButton>

        <ActionButton>
          <Download size={16} />
          Export
        </ActionButton>

        <ActionButton>
          <Share2 size={16} />
          Share
        </ActionButton>

        <NotificationButton
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={20} />
          <NotificationBadge>3</NotificationBadge>
        </NotificationButton>
      </HeaderRight>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadows.sm};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md};
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const BrandLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BrandDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const BrandName = styled.h1`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  margin: 0;
  color: ${theme.colors.textPrimary};
`;

const BrandTagline = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: ${theme.spacing.sm};
  }
`;

const DateRangeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textPrimary};
  position: relative;

  select {
    appearance: none;
    background: transparent;
    border: none;
    font-size: ${theme.typography.fontSizes.sm};
    color: ${theme.colors.textPrimary};
    padding-right: ${theme.spacing.lg};
    cursor: pointer;
    outline: none;
  }

  svg:last-child {
    position: absolute;
    right: ${theme.spacing.md};
    pointer-events: none;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.textPrimary};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.border};
    transform: translateY(-1px);
  }
`;

const NotificationButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textPrimary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.border};
    transform: translateY(-1px);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: ${theme.colors.error};
  color: ${theme.colors.background};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.bold};
  border-radius: 50%;
`;

export default DashboardHeader;
