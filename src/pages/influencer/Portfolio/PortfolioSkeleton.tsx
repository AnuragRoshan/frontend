import { useEffect, useState } from "react";
import SkeletonTop from "../../../components/layout/SkeletonTop";
import SkeletonInner from "../../../components/layout/SkeletonInner";

const CreatorPortfolioSkeleton = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (showContent) return null; // real content would render after 800ms

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "20px",
        color: "#1f2937", // fallback color similar to sharedTheme.colorVariants.secondary.dark
      }}
    >
      <SkeletonTop>
        <SkeletonInner style={{ width: "120px", height: "36px" }} />
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <SkeletonInner style={{ width: "120px", height: "36px" }} />
          <SkeletonInner style={{ width: "120px", height: "36px" }} />
        </div>

        <SkeletonInner style={{ width: "220px", height: "24px" }} />
        <SkeletonInner style={{ width: "280px", height: "16px" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <SkeletonInner style={{ height: "180px" }} />
              <SkeletonInner style={{ width: "60%", height: "14px" }} />
              <SkeletonInner style={{ height: "14px" }} />
              <SkeletonInner style={{ width: "80%", height: "12px" }} />
            </div>
          ))}
        </div>
      </SkeletonTop>
    </div>
  );
};

export default CreatorPortfolioSkeleton;
