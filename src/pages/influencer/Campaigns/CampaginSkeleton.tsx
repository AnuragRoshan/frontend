import styled from "styled-components";
import SkeletonTop from "../../../components/layout/SkeletonTop";
import SkeletonInner from "../../../components/layout/SkeletonInner";

const CampaignsSkeleton = () => {
  return (
    <PageContainer>
      {/* Header */}
      <SkeletonTop
        style={{
          height: 100,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <SkeletonInner style={{ width: "40%" }} />
        <SkeletonInner style={{ width: "60%" }} />
      </SkeletonTop>

      {/* Insights */}
      <SkeletonTop
        style={{
          height: 140,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonInner key={i} style={{ height: 120 }} />
        ))}
      </SkeletonTop>

      {/* Recommended Campaigns */}
      <SkeletonTop
        style={{
          height: 180,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonInner key={i} style={{ height: 150 }} />
        ))}
      </SkeletonTop>

      {/* Filters and Campaign List */}
      <MainContent>
        <SideColumn>
          <SkeletonTop style={{ height: 400, borderRadius: 8 }}>
            <SkeletonInner style={{ width: "80%" }} />
            <SkeletonInner style={{ width: "90%" }} />
            <SkeletonInner style={{ width: "60%" }} />
            <SkeletonInner style={{ width: "50%" }} />
          </SkeletonTop>
        </SideColumn>

        <MainColumn>
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonTop
              key={i}
              style={{ height: 200, borderRadius: 8, marginBottom: "1rem" }}
            >
              <SkeletonInner style={{ width: "80%" }} />
              <SkeletonInner style={{ width: "70%" }} />
              <SkeletonInner style={{ width: "60%" }} />
            </SkeletonTop>
          ))}
        </MainColumn>
      </MainContent>
    </PageContainer>
  );
};

export default CampaignsSkeleton;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
  gap: 1.5rem;
`;

const MainContent = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const MainColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SideColumn = styled.div`
  width: 250px;
`;
