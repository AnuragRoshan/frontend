import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </Layout>
  );
};

export default DashboardLayout;
