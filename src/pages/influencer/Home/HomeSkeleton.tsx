import React from "react";
import SkeletonTop from "../../../components/layout/SkeletonTop";
import SkeletonInner from "../../../components/layout/SkeletonInner";
import styled from "styled-components";

const HomeSkeleton = () => {
  return (
    <PageContainer>
      {/* Banner */}
      <SkeletonTop
        style={{
          height: 160,
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <SkeletonInner style={{ width: "80%" }} />
        <SkeletonInner style={{ width: "70%" }} />
        <SkeletonInner style={{ width: "60%" }} />
        <SkeletonInner style={{ width: "50%" }} />
      </SkeletonTop>

      {/* Stats Overview */}
      <StatsContainer>
        <SkeletonTop
          style={{
            height: 160,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <SkeletonInner style={{ width: "80%" }} />
          <SkeletonInner style={{ width: "70%" }} />
          <SkeletonInner style={{ width: "60%" }} />
        </SkeletonTop>
        <SkeletonTop
          style={{
            height: 160,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <SkeletonInner style={{ width: "80%" }} />
          <SkeletonInner style={{ width: "70%" }} />
          <SkeletonInner style={{ width: "60%" }} />
        </SkeletonTop>
        <SkeletonTop
          style={{
            height: 160,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <SkeletonInner style={{ width: "80%" }} />
          <SkeletonInner style={{ width: "70%" }} />
          <SkeletonInner style={{ width: "60%" }} />
        </SkeletonTop>
      </StatsContainer>

      <MainContent>
        {/* Main Left Column */}
        <MainColumn>
          <SkeletonTop
            style={{
              height: 200,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <SkeletonInner style={{ width: "80%" }} />
            <SkeletonInner style={{ width: "70%" }} />
            <SkeletonInner style={{ width: "60%" }} />
          </SkeletonTop>
          <SkeletonTop
            style={{
              height: 280,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <SkeletonInner style={{ width: "80%" }} />
            <SkeletonInner style={{ width: "70%" }} />
            <SkeletonInner style={{ width: "60%" }} />
          </SkeletonTop>
          <SkeletonTop
            style={{
              height: 200,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <SkeletonInner style={{ width: "80%" }} />
            <SkeletonInner style={{ width: "70%" }} />
            <SkeletonInner style={{ width: "60%" }} />
          </SkeletonTop>
        </MainColumn>

        {/* Right Column */}
        <SideColumn>
          <SkeletonTop
            style={{
              height: 280,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <SkeletonInner style={{ width: "80%" }} />
            <SkeletonInner style={{ width: "70%" }} />
            <SkeletonInner style={{ width: "60%" }} />
            <SkeletonInner style={{ width: "50%" }} />
          </SkeletonTop>
          <SkeletonTop
            style={{
              height: 320,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <SkeletonInner style={{ width: "80%" }} />
            <SkeletonInner style={{ width: "70%" }} />
            <SkeletonInner style={{ width: "60%" }} />
            <SkeletonInner style={{ width: "50%" }} />
          </SkeletonTop>
        </SideColumn>
      </MainContent>
    </PageContainer>
  );
};

export default HomeSkeleton;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
