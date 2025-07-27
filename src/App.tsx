// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "./providers/reduxProvider";

// Auth Components
import LoginBrand from "./components/auth/LoginBrand";
import LoginInfluencer from "./components/auth/LoginInfluencer";
import SignUpInfluencer from "./components/auth/SignUpInfluencer";
import AuthGuard from "./components/auth/AuthGuard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Layout Components
import DashboardLayout from "./components/layout/DashBoardLayout";

// Page Components
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
          {/* 
            AUTH ROUTES - Protected by AuthGuard 
            These routes are only accessible when user is NOT authenticated
            Authenticated users will be redirected to their dashboard
          */}
          <Route
            path="/login"
            element={
              <AuthGuard>
                <LoginInfluencer />
              </AuthGuard>
            }
          />
          <Route
            path="/loginbrand"
            element={
              <AuthGuard>
                <LoginBrand />
              </AuthGuard>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthGuard>
                <SignUpInfluencer />
              </AuthGuard>
            }
          />

          {/* 
            PUBLIC ROUTES 
            These routes are accessible to everyone
          */}
          <Route path="/" element={<LandingPage />} />

          {/* 
            PROTECTED ROUTES - Require Authentication
            These routes are only accessible when user IS authenticated
            Non-authenticated users will be redirected to login
          */}

          {/* INFLUENCER ROUTES */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Home />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Campaigns />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/deals"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Deals />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreatorPortfolio />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NotificationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/SubmitContent/:campaignId"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SubmitContent />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* BRAND ROUTES */}
          <Route
            path="/brandDashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <BrandDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/brandCampaign"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CampaignsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/brandApplication"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InfluencerApplicationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/collabManagement"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CollaborationManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/brand/campaigns/:campaignId/influencer-discovery"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InfluencerDiscoveryPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bulk-deal/:campaignId"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <BulkDealsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/custom-deal/:campaignId"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CustomDealsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/brandDeals"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <BrandDealsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* 
            FALLBACK ROUTE 
            Redirect any unknown routes to landing page
          */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
