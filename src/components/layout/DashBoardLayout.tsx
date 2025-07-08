import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { sharedTheme } from "../../styles/theme/theme";
import { FileText, Globe, HelpCircle, Settings2 } from "lucide-react";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`;

const DashboardFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-top: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const FooterCopyright = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      {location.pathname !== "/" && <Sidebar />}
      <MainContent>
        {children}

        {location.pathname !== "/" && (
          <DashboardFooter>
            <FooterLeft>
              <FooterLogo>
                <Globe size={20} />
                <span>CreatorAnalytics</span>
              </FooterLogo>
              <FooterCopyright>
                © 2024 CreatorAnalytics. All rights reserved.
              </FooterCopyright>
            </FooterLeft>
            <FooterLinks>
              <FooterLink>
                <HelpCircle size={16} />
                Help Center
              </FooterLink>
              <FooterLink>
                <Settings2 size={16} />
                Settings
              </FooterLink>
              <FooterLink>
                <FileText size={16} />
                Documentation
              </FooterLink>
            </FooterLinks>
          </DashboardFooter>
        )}
      </MainContent>
    </Layout>
  );
};

export default DashboardLayout;
