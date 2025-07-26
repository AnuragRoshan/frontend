// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "./providers/reduxProvider";
import LoginBrand from "./components/auth/LoginBrand";
import LoginInfluencer from "./components/auth/LoginInfluencer";
import SignUpInfluencer from "./components/auth/SignUpInfluencer";
import DashboardLayout from "./components/layout/DashBoardLayout";
import Home from "./pages/influencer/Home/Home";
import Campaigns from "./pages/influencer/Campaigns/Campaigns";
import SubmitContent from "./pages/influencer/Campaigns/CampaignDetail";
import Profile from "./pages/influencer/Profile/Profile";
import CreatorPortfolio from "./pages/influencer/Portfolio/Portfolio";
import Dashboard from "./pages/influencer/Dashboard";
import NotificationsPage from "./pages/influencer/Notifications/Notifications";
import SettingsPage from "./pages/Settings/Settings";
import LandingPage from "./pages/landing/Landing";
import BrandDashboard from "./pages/brand/Dashboard/BrandDashboard";
import CampaignsPage from "./pages/brand/Campaign/BrandCampaign";
import InfluencerApplicationsPage from "./pages/brand/Campaign/InfluencerApplication";
import CollaborationManagement from "./pages/brand/Campaign/CollaborationManagement";
import InfluencerDiscoveryPage from "./pages/brand/Campaign/Brand Campaign/InfluencerDiscovery/InfluencerDiscovery";
import BulkDealsPage from "./pages/brand/Deal/BulkDeal/BulkDeal";
import CustomDealsPage from "./pages/brand/Deal/CustomDeal/CustomDeal";
import Deals from "./pages/influencer/Deal/Deals";
import BrandDealsPage from "./pages/brand/Deal/Deal/BrandDeal";

const App = () => {
  return (
    <ReduxProvider>
      <BrowserRouter>
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />

        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginInfluencer />} />
          <Route path="/loginbrand" element={<LoginBrand />} />
          <Route path="/signup" element={<SignUpInfluencer />} />

          {/* Dashboard layout routes */}
          <Route
            path="/home"
            element={
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            }
          />
          <Route
            path="/"
            element={
              <DashboardLayout>
                <LandingPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <DashboardLayout>
                <NotificationsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/portfolio"
            element={
              <DashboardLayout>
                <CreatorPortfolio />
              </DashboardLayout>
            }
          />
          <Route
            path="/campaigns"
            element={
              <DashboardLayout>
                <Campaigns />
              </DashboardLayout>
            }
          />
          <Route
            path="/deals"
            element={
              <DashboardLayout>
                <Deals />
              </DashboardLayout>
            }
          />
          <Route
            path="/brandDeals"
            element={
              <DashboardLayout>
                <BrandDealsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/SubmitContent/:campaignId"
            element={
              <DashboardLayout>
                <SubmitContent />
              </DashboardLayout>
            }
          />
          <Route
            path="/brandDashboard"
            element={
              <DashboardLayout>
                <BrandDashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/brandCampaign"
            element={
              <DashboardLayout>
                <CampaignsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/brandApplication"
            element={
              <DashboardLayout>
                <InfluencerApplicationsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/collabManagement"
            element={
              <DashboardLayout>
                <CollaborationManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/brand/campaigns/:campaignId/influencer-discovery"
            element={
              <DashboardLayout>
                <InfluencerDiscoveryPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/bulk-deal/:campaignId"
            element={
              <DashboardLayout>
                <BulkDealsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/custom-deal/:campaignId"
            element={
              <DashboardLayout>
                <CustomDealsPage />
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
