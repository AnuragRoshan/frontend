import React from "react";
import styled from "styled-components";
import { theme } from "../theme";
import { BarChart2, Target, TrendingUp, Eye, Users } from "lucide-react";

interface PlatformDistribution {
  platform: string;
  campaigns: number;
  budget: number;
}

interface CategoryPerformance {
  category: string;
  campaigns: number;
  engagement: number;
  roi: number;
}

interface AnalyticsData {
  platformDistribution: PlatformDistribution[];
  categoryPerformance: CategoryPerformance[];
}

interface OverviewData {
  roi: number;
  avgEngagementRate: number;
  conversionRate: number;
  reachGrowth: number;
}

interface AnalyticsSectionProps {
  analytics: AnalyticsData;
  overview: OverviewData;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  analytics,
  overview,
}) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Campaign Analytics</SectionTitle>
        <SectionDescription>
          Detailed performance insights and ROI analysis
        </SectionDescription>
      </SectionHeader>

      <AnalyticsGrid>
        <AnalyticsCard>
          <CardHeader>
            <CardTitle>Campaign Performance Trend</CardTitle>
          </CardHeader>
          <ChartContainer>
            <ChartPlaceholder>
              <BarChart2 size={48} />
              <span>Campaign performance chart would appear here</span>
            </ChartPlaceholder>
          </ChartContainer>
        </AnalyticsCard>

        <AnalyticsCard>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <PlatformStats>
            {analytics.platformDistribution.map(
              (platform: PlatformDistribution) => (
                <PlatformStat key={platform.platform}>
                  <PlatformName>{platform.platform}</PlatformName>
                  <PlatformMetrics>
                    <PlatformMetric>
                      {platform.campaigns} campaigns
                    </PlatformMetric>
                    <PlatformMetric>{platform.budget}% budget</PlatformMetric>
                  </PlatformMetrics>
                </PlatformStat>
              )
            )}
          </PlatformStats>
        </AnalyticsCard>

        <AnalyticsCard>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CategoryStats>
            {analytics.categoryPerformance.map(
              (category: CategoryPerformance) => (
                <CategoryStat key={category.category}>
                  <CategoryName>{category.category}</CategoryName>
                  <CategoryMetrics>
                    <CategoryMetric>
                      {category.campaigns} campaigns
                    </CategoryMetric>
                    <CategoryMetric>
                      {category.engagement}% engagement
                    </CategoryMetric>
                    <CategoryMetric>{category.roi}% ROI</CategoryMetric>
                  </CategoryMetrics>
                </CategoryStat>
              )
            )}
          </CategoryStats>
        </AnalyticsCard>

        <AnalyticsCard fullWidth>
          <CardHeader>
            <CardTitle>ROI & Engagement Insights</CardTitle>
          </CardHeader>
          <InsightsGrid>
            <InsightCard>
              <InsightIcon>
                <Target size={20} />
              </InsightIcon>
              <InsightContent>
                <InsightTitle>Average ROI</InsightTitle>
                <InsightValue>{overview.roi}%</InsightValue>
                <InsightDescription>
                  18.5% increase from last quarter
                </InsightDescription>
              </InsightContent>
            </InsightCard>

            <InsightCard>
              <InsightIcon>
                <TrendingUp size={20} />
              </InsightIcon>
              <InsightContent>
                <InsightTitle>Engagement Rate</InsightTitle>
                <InsightValue>{overview.avgEngagementRate}%</InsightValue>
                <InsightDescription>
                  Above industry average of 3.2%
                </InsightDescription>
              </InsightContent>
            </InsightCard>

            <InsightCard>
              <InsightIcon>
                <Eye size={20} />
              </InsightIcon>
              <InsightContent>
                <InsightTitle>Conversion Rate</InsightTitle>
                <InsightValue>{overview.conversionRate}%</InsightValue>
                <InsightDescription>
                  1.2% improvement this month
                </InsightDescription>
              </InsightContent>
            </InsightCard>

            <InsightCard>
              <InsightIcon>
                <Users size={20} />
              </InsightIcon>
              <InsightContent>
                <InsightTitle>Reach Growth</InsightTitle>
                <InsightValue>{overview.reachGrowth}%</InsightValue>
                <InsightDescription>Organic reach expansion</InsightDescription>
              </InsightContent>
            </InsightCard>
          </InsightsGrid>
        </AnalyticsCard>
      </AnalyticsGrid>
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
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  margin: 0;
  color: ${theme.colors.textPrimary};
`;

const SectionDescription = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textSecondary};
  margin: 0;
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface AnalyticsCardProps {
  fullWidth?: boolean;
}

const AnalyticsCard = styled.div<AnalyticsCardProps>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin: 0;
  color: ${theme.colors.textPrimary};
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  flex: 1;
`;

const ChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textSecondary};
  text-align: center;
  gap: ${theme.spacing.md};
`;

const PlatformStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const PlatformStat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
`;

const PlatformName = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.textPrimary};
`;

const PlatformMetrics = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing.xs};
`;

const PlatformMetric = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

const CategoryStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const CategoryStat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
`;

const CategoryName = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.textPrimary};
`;

const CategoryMetrics = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.spacing.xs};
`;

const CategoryMetric = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const InsightCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
`;

const InsightIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.background};
  color: ${theme.colors.primary};
`;

const InsightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const InsightTitle = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.textPrimary};
`;

const InsightValue = styled.div`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary};
`;

const InsightDescription = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

export default AnalyticsSection;
