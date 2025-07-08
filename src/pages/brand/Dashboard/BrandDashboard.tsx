"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "./theme";
import { brandData } from "./data/brandData";
import DashboardHeader from "./components/header";
import DashboardTabs from "./components/tabs";
import OverviewSection from "./components/overview";
import CampaignsSection from "./components/campaigns";
import InfluencersSection from "./components/influencers";
import AnalyticsSection from "./components/Analytics";
import TasksSection from "./components/task";

const BrandDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("last30Days");
  const [showNotifications, setShowNotifications] = useState(false);

  const renderActiveSection = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewSection data={brandData} />;
      case "campaigns":
        return <CampaignsSection campaigns={brandData.campaigns} />;
      case "influencers":
        return <InfluencersSection influencers={brandData.topInfluencers} />;
      case "analytics":
        return (
          <AnalyticsSection
            analytics={brandData.analytics}
            overview={brandData.overview}
          />
        );
      case "tasks":
        return (
          <TasksSection
            tasks={brandData.pendingTasks.map((task) => ({
              ...task,
              priority:
                task.priority === "high"
                  ? "high"
                  : task.priority === "medium"
                  ? "medium"
                  : "low",
            }))}
          />
        );
      default:
        return <OverviewSection data={brandData} />;
    }
  };

  return (
    <PageContainer>
      <DashboardHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />

      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <DashboardContent>{renderActiveSection()}</DashboardContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${theme.colors.surface};
  color: ${theme.colors.textPrimary};
`;

const DashboardContent = styled.main`
  flex: 1;
  padding: ${theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
`;

export default BrandDashboard;
