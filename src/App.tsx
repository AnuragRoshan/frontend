import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginBrand from "./components/auth/LoginBrand";
import LoginInfluencer from "./components/auth/LoginInfluencer";
import DashboardLayout from "./components/layout/DashBoardLayout";
import { useState } from "react";
import Drawer from "./components/layout/Drawer";

const Home = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setDrawerOpen(true)}>Open Drawer</button>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="sm"
        anchor="left"
      >
        <h2>Welcome to the Home Drawer</h2>
        <p>This is reusable content for the drawer.</p>
      </Drawer>
    </div>
  );
};
const Dashboard = () => <div>Analytics Page</div>;
const Settings = () => <div>Settings Page</div>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginInfluencer />} />
        <Route path="/loginbrand" element={<LoginBrand />} />

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
              <Settings />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
