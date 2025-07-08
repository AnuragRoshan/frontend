import React from "react";
import styled from "styled-components";
import { theme, formatNumber } from "../theme.ts";
import { Search, Users, Plus, MessageSquare, MapPin, Star } from "lucide-react";

interface Influencer {
  id: string | number;
  name: string;
  username: string;
  avatar?: string;
  location: string;
  rating: number;
  followers: number;
  engagement: number;
  campaigns: number;
  niche: string;
  totalEarned: number;
}

interface InfluencersSectionProps {
  influencers: Influencer[];
}

const InfluencersSection: React.FC<InfluencersSectionProps> = ({
  influencers,
}) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Top Performing Influencers</SectionTitle>
        <HeaderActions>
          <SearchBox>
            <Search size={16} />
            <input type="text" placeholder="Search influencers..." />
          </SearchBox>
          <ActionButton>
            <Users size={16} />
            Discover New
          </ActionButton>
        </HeaderActions>
      </SectionHeader>

      <InfluencersGrid>
        {influencers.map((influencer) => (
          <InfluencerCard key={influencer.id}>
            <InfluencerHeader>
              <InfluencerAvatar>
                <img
                  src={influencer.avatar || "/placeholder.svg"}
                  alt={influencer.name}
                />
              </InfluencerAvatar>
              <InfluencerInfo>
                <InfluencerName>{influencer.name}</InfluencerName>
                <InfluencerUsername>{influencer.username}</InfluencerUsername>
                <InfluencerLocation>
                  <MapPin size={12} />
                  {influencer.location}
                </InfluencerLocation>
              </InfluencerInfo>
              <InfluencerRating>
                <Star size={14} />
                {influencer.rating}
              </InfluencerRating>
            </InfluencerHeader>

            <InfluencerStats>
              <StatItem>
                <StatLabel>Followers</StatLabel>
                <StatValue>{formatNumber(influencer.followers)}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Engagement</StatLabel>
                <StatValue>{influencer.engagement}%</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Campaigns</StatLabel>
                <StatValue>{influencer.campaigns}</StatValue>
              </StatItem>
            </InfluencerStats>

            <InfluencerMeta>
              <NicheBadge>{influencer.niche}</NicheBadge>
              <EarningsInfo>
                Total Earned: ₹{formatNumber(influencer.totalEarned)}
              </EarningsInfo>
            </InfluencerMeta>

            <InfluencerActions>
              <ActionButton small>
                <MessageSquare size={14} />
                Message
              </ActionButton>
              <ActionButton small primary>
                <Plus size={14} />
                Invite
              </ActionButton>
            </InfluencerActions>
          </InfluencerCard>
        ))}
      </InfluencersGrid>
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

const InfluencersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${theme.spacing.lg};
`;

const InfluencerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const InfluencerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`;

const InfluencerAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfluencerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  flex: 1;
`;

const InfluencerName = styled.h4`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin: 0;
  color: ${theme.colors.textPrimary};
`;

const InfluencerUsername = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const InfluencerLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

const InfluencerRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.warning};
`;

const InfluencerStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.textPrimary};
`;

const InfluencerMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const NicheBadge = styled.div`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.primary};
  background-color: ${theme.colors.primary}20;
  border-radius: ${theme.borderRadius.sm};
`;

const EarningsInfo = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

const InfluencerActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

export default InfluencersSection;
