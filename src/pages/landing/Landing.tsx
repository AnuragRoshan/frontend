"use client";

import type React from "react";
import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  ArrowRight,
  Instagram,
  Youtube,
  Twitter,
  Globe,
  Sparkles,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Modern theme inspired by Medusa.js
const theme = {
  colors: {
    gray: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      950: "#0A0A0A",
    },
    purple: {
      50: "#FAF5FF",
      100: "#F3E8FF",
      500: "#8B5CF6",
      600: "#7C3AED",
      700: "#6D28D9",
    },
    blue: {
      50: "#EFF6FF",
      500: "#3B82F6",
      600: "#2563EB",
    },
    green: {
      500: "#10B981",
      600: "#059669",
    },
    white: "#FFFFFF",
  },
  typography: {
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
    },
    letterSpacing: {
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
    },
  },
  spacing: {
    px: "1px",
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
};

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

// const bounce = keyframes`
//   0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
//   40% { transform: translateY(-10px); }
//   60% { transform: translateY(-5px); }
// `;

// Enhanced animations for scroll triggers

// Base Layout Components
/* const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray[50]};
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  line-height: ${theme.typography.lineHeight.normal};
  color: ${theme.colors.gray[900]};
`; */

const Section = styled.section<{ variant?: "default" | "gray" | "dark" }>`
  padding: ${theme.spacing[20]} ${theme.spacing[4]};

  ${(props) =>
    props.variant === "gray" &&
    css`
      background: ${theme.colors.gray[50]};
    `}

  ${(props) =>
    props.variant === "dark" &&
    css`
      background: ${theme.colors.gray[900]};
      color: white;
    `}
  
  @media (min-width: 768px) {
    padding: ${theme.spacing[24]} ${theme.spacing[8]};
  }
`;

const MaxWidthWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

// Header Components
const Header = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 10px;
  left: 0;
  margin: auto;
  width: 80%;
  border-radius: ${theme.borderRadius["2xl"]};
  right: 0;
  border: 2px solid #5a5a5a2e;
  z-index: 50;
  background: ${(props) =>
    props.isScrolled ? "rgba(250, 250, 250, 0.8)" : "rgba(250, 250, 250, 0.6)"};
  backdrop-filter: blur(12px);
  /* border-bottom: 1px solid
    ${(props) =>
    props.isScrolled ? theme.colors.gray[200] : "transparent"}; */
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: ${theme.spacing[6]} ${theme.spacing[8]};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  cursor: pointer;
  letter-spacing: ${theme.typography.letterSpacing.tight};
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: none;
  align-items: center;
  gap: ${theme.spacing[8]};

  @media (min-width: 768px) {
    display: flex;
  }

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 320px;
    background: white;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.spacing[6]};
    transform: ${(props) =>
      props.isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -10px 0 25px -5px rgba(0, 0, 0, 0.1);
    display: flex;
  }
`;

const NavLink = styled.a`
  color: ${theme.colors.gray[600]};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeights.medium};
  font-size: ${theme.typography.fontSizes.sm};
  transition: color 200ms ease;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.gray[900]};
  }
`;

const Button = styled.button<{
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeights.medium};
  font-size: ${theme.typography.fontSizes.sm};
  transition: all 200ms ease;
  cursor: pointer;
  border: none;
  text-decoration: none;
  white-space: nowrap;

  ${(props) => {
    const size = props.size || "md";
    switch (size) {
      case "sm":
        return css`
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSizes.xs};
        `;
      case "lg":
        return css`
          padding: ${theme.spacing[4]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSizes.base};
        `;
      default:
        return css`
          padding: ${theme.spacing[3]} ${theme.spacing[4]};
        `;
    }
  }}

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return css`
          background: ${theme.colors.gray[900]};
          color: white;

          &:hover {
            background: ${theme.colors.gray[800]};
            transform: translateY(-1px);
          }

          &:active {
            transform: translateY(0);
          }
        `;
      case "secondary":
        return css`
          background: white;
          color: ${theme.colors.gray[900]};
          border: 1px solid ${theme.colors.gray[200]};

          &:hover {
            background: ${theme.colors.gray[50]};
            border-color: ${theme.colors.gray[300]};
          }
        `;
      case "outline":
        return css`
          background: transparent;
          color: ${theme.colors.gray[900]};
          border: 1px solid ${theme.colors.gray[300]};

          &:hover {
            background: ${theme.colors.gray[900]};
            color: white;
          }
        `;
      case "ghost":
        return css`
          background: transparent;
          color: ${theme.colors.gray[600]};

          &:hover {
            background: ${theme.colors.gray[100]};
            color: ${theme.colors.gray[900]};
          }
        `;
      default:
        return css`
          background: ${theme.colors.gray[900]};
          color: white;
        `;
    }
  }}
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    padding: 0 ${theme.spacing[6]};

    ${Button} {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: ${theme.colors.gray[600]};
  cursor: pointer;
  padding: ${theme.spacing[2]};

  @media (min-width: 768px) {
    display: none;
  }
`;

// Hero Section
const HeroSection = styled(Section)`
  padding-top: ${theme.spacing[32]};
  padding-bottom: ${theme.spacing[20]};
  text-align: center;
  position: relative;

  @media (min-width: 768px) {
    padding-top: ${theme.spacing[32]};
    padding-bottom: ${theme.spacing[24]};
  }
`;

const HeroContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.fontSizes["4xl"]};
  font-weight: ${theme.typography.fontWeights.extrabold};
  line-height: ${theme.typography.lineHeight.tight};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[6]};

  @media (min-width: 768px) {
    font-size: ${theme.typography.fontSizes["6xl"]};
  }

  @media (min-width: 1024px) {
    font-size: ${theme.typography.fontSizes["7xl"]};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.gray[600]};
  line-height: ${theme.typography.lineHeight.relaxed};
  max-width: 640px;
  margin: 0 auto ${theme.spacing[8]};

  @media (min-width: 768px) {
    font-size: ${theme.typography.fontSizes.xl};
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[16]};

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
    gap: ${theme.spacing[4]};
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  animation: ${fadeInUp} 800ms ease-out 200ms both;
`;

const HeroImage = styled.div`
  /* aspect-ratio: 16 / 10; */
  background: white;
  border-radius: ${theme.borderRadius["2xl"]};
  border: 1px solid ${theme.colors.gray[200]};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  position: relative;
`;

const DashboardPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FloatingCard = styled.div<{ position: string; delay?: number }>`
  position: absolute;
  ${(props) => props.position};
  background: white;
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid ${theme.colors.gray[200]};
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || 0}s;
  z-index: 10;
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    font-size: ${theme.typography.fontSizes.sm};
  }
`;

const CardValue = styled.div`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[1]};
`;

const CardLabel = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const StatsSection = styled(Section)`
  /* background: linear-gradient(135deg, #fffcef 0%, #fff8db 50%, #ffefd3 100%); */
  /* border: 4px solid #f59e0b; */
  /* border-radius: 25px 15px 30px 20px; */
  position: relative;
  margin: ${theme.spacing[8]} 0;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    /* background: linear-gradient(45deg, #ec4899, #8b5cf6, #06b6d4, #10b981); */
    border-radius: 30px 20px 35px 25px;
    z-index: -1;
    animation: ${fadeInUp} 1000ms ease-out;
  }

  &::after {
    content: "✨";
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 2rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing[6]};
  padding: ${theme.spacing[8]};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing[8]};
  }
`;

const StatItem = styled.div`
  text-align: center;
  background: white;
  padding: ${theme.spacing[6]};
  border-radius: 20px 15px 25px 18px;
  border: 3px solid #f59e0b;
  position: relative;
  transform: rotate(-1deg);
  transition: all 300ms ease;
  animation: ${fadeInUp} 600ms ease-out;
  box-shadow: 5px 5px 0px #f59e0b;

  &:nth-child(2) {
    transform: rotate(1deg);
    /* border-color: #ec4899; */
    box-shadow: 5px 5px 0px #ec4899;
  }

  &:nth-child(3) {
    transform: rotate(-0.5deg);
    border-color: #8b5cf6;
    box-shadow: 5px 5px 0px #8b5cf6;
  }

  &:nth-child(4) {
    transform: rotate(0.8deg);
    border-color: #10b981;
    box-shadow: 5px 5px 0px #10b981;
  }

  &:hover {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 8px 8px 0px currentColor;
  }

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 70%
    );
    border-radius: 25px 20px 30px 23px;
    z-index: -1;
  }
`;

const StatNumber = styled.div`
  font-size: ${theme.typography.fontSizes["3xl"]};
  font-weight: ${theme.typography.fontWeights.extrabold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[2]};
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
  /* font-family: "Comic Sans MS", cursive, sans-serif; */

  @media (min-width: 768px) {
    font-size: ${theme.typography.fontSizes["4xl"]};
  }
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.gray[700]};
  font-weight: ${theme.typography.fontWeights.bold};
  /* font-family: "Comic Sans MS", cursive, sans-serif; */
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FeatureSectionWrapper = styled.section<{ isVisible: boolean }>`
  padding: 100px 0;
  position: relative;
  overflow: hidden;

  &:nth-child(even) {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(120, 119, 198, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 107, 107, 0.1) 0%,
        transparent 50%
      );
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transition: opacity 1.2s ease-in-out;
  }
`;

const FeatureSectionContent = styled.div<{
  isVisible: boolean;
  reverse?: boolean;
}>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 1;

  ${(props) =>
    props.reverse &&
    css`
      direction: rtl;
      * {
        direction: ltr;
      }
    `}

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 50px;
    text-align: center;
  }
`;

const FeatureSectionText = styled.div<{
  isVisible: boolean;
  reverse?: boolean;
}>`
  transform: ${(props) =>
    props.isVisible
      ? "translateX(0)"
      : props.reverse
      ? "translateX(60px)"
      : "translateX(-60px)"};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 200ms;
`;

const FeatureSectionImage = styled.div<{
  isVisible: boolean;
  reverse?: boolean;
}>`
  position: relative;
  transform: ${(props) =>
    props.isVisible
      ? "translateX(0) scale(1)"
      : props.reverse
      ? "translateX(-60px) scale(0.9)"
      : "translateX(60px) scale(0.9)"};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 400ms;

  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 4px solid white;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05) rotate(2deg);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    border-radius: 30px;
    z-index: -1;
    opacity: ${(props) => (props.isVisible ? 0.3 : 0)};
    transition: opacity 0.8s ease;
    background-size: 300% 300%;
    animation: ${(props) =>
      props.isVisible ? css`gradientShift 4s ease infinite` : "none"};
  }
`;

const FeatureSectionTitle = styled.h2`
  font-size: ${theme.typography.fontSizes["4xl"]};
  font-weight: ${theme.typography.fontWeights.bold};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[6]};
  animation: ${fadeInUp} 600ms ease-out;

  @media (min-width: 768px) {
    font-size: ${theme.typography.fontSizes["5xl"]};
  }
`;

const FeatureSectionDescription = styled.p`
  font-size: ${theme.typography.fontSizes.xl};
  color: ${theme.colors.gray[600]};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing[8]};
  animation: ${fadeInUp} 700ms ease-out;
`;

const FeatureSectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  animation: ${fadeInUp} 800ms ease-out;
`;

const FeatureSectionListItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${theme.spacing[4]};
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.gray[700]};

  &:before {
    content: "✓";
    color: ${theme.colors.green[500]};
    font-weight: bold;
    margin-right: ${theme.spacing[3]};
    margin-top: 2px;
  }
`;

// CTA Section
const CTASection = styled(Section)`
  background: ${theme.colors.gray[900]};
  color: white;
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 768px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: ${theme.typography.fontSizes["3xl"]};
  font-weight: ${theme.typography.fontWeights.bold};
  line-height: ${theme.typography.lineHeight.tight};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  margin-bottom: ${theme.spacing[4]};

  @media (min-width: 768px) {
    font-size: ${theme.typography.fontSizes["4xl"]};
  }
`;

const CTADescription = styled.p`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.gray[300]};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing[8]};
`;

const CTAActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[4]};

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const CTAButton = styled(Button)`
  background: white;
  color: ${theme.colors.gray[900]};

  &:hover {
    background: ${theme.colors.gray[100]};
    transform: translateY(-2px);
  }
`;

const CTAButtonSecondary = styled(Button)`
  background: transparent;
  color: white;
  border: 1px solid ${theme.colors.gray[600]};

  &:hover {
    background: ${theme.colors.gray[800]};
    border-color: ${theme.colors.gray[500]};
  }
`;

// Footer
const Footer = styled.footer`
  background: ${theme.colors.gray[900]};
  color: white;
  padding: ${theme.spacing[16]} ${theme.spacing[4]} ${theme.spacing[8]};
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[8]};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing[12]};
  }

  @media (min-width: 1024px) {
    grid-template-columns: 2fr repeat(3, 1fr);
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.base};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin-bottom: ${theme.spacing[4]};
`;

const FooterDescription = styled.p`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.typography.fontSizes.sm};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing[6]};
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: ${theme.spacing[3]};

  a {
    color: ${theme.colors.gray[400]};
    text-decoration: none;
    font-size: ${theme.typography.fontSizes.sm};
    transition: color 200ms ease;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: ${theme.colors.gray[800]};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[400]};
  text-decoration: none;
  transition: all 200ms ease;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.gray[700]};
    color: white;
    transform: translateY(-2px);
  }
`;

const BlurOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 30%,
    rgba(255, 255, 255, 0.3) 60%,
    transparent 100%
  );
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 5;
  pointer-events: none;
`;

const FooterBottom = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  border-top: 1px solid ${theme.colors.gray[800]};
  padding-top: ${theme.spacing[8]};
  margin-top: ${theme.spacing[12]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing[4]};

  @media (max-width: 767px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.typography.fontSizes.sm};
`;

// New Decorative Elements Section Components
const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSizes["3xl"]};
  font-weight: ${theme.typography.fontWeights.bold};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing[6]};
  animation: ${fadeInUp} 600ms ease-out;

  @media (min-width: 768px) {
    font-size: ${theme.typography.fontSizes["4xl"]};
  }
`;

const DecorativeSection = styled.div`
  padding: ${theme.spacing[16]} 0;
  /* background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%); */
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: -50px;
    width: 100px;
    height: 100px;
    background: #ec4899;
    border-radius: 50%;
    opacity: 0.1;
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 80px;
    height: 80px;
    background: #8b5cf6;
    border-radius: 50%;
    opacity: 0.1;
    animation: ${float} 4s ease-in-out infinite reverse;
  }
`;

const FunFactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing[6]};
  margin-top: ${theme.spacing[8]};
`;

const FunFactCard = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing[6]};
  border-radius: 20px 15px 25px 18px;
  border: 3px solid #10b981;
  transform: rotate(-0.5deg);
  transition: all 300ms ease;
  box-shadow: 5px 5px 0px #10b981;
  text-align: center;

  &:nth-child(2) {
    transform: rotate(1deg);
    border-color: #ec4899;
    box-shadow: 5px 5px 0px #ec4899;
  }

  &:nth-child(3) {
    transform: rotate(-1deg);
    border-color: #8b5cf6;
    box-shadow: 5px 5px 0px #8b5cf6;
  }

  &:hover {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 8px 8px 0px currentColor;
  }
`;

const FunFactText = styled.p`
  /* font-family: "Comic Sans MS", cursive, sans-serif; */
  font-weight: bold;
  color: ${theme.colors.gray[800]};
  margin: 0;
`;

const useScrollAnimation = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all sections with data-animate attribute
    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return visibleSections;
};

const LandingPageContainer = styled.div`
  overflow: hidden;
`;

// Main Component
const ModernLandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const visibleSections = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <LandingPageContainer>
      <Header isScrolled={isScrolled}>
        <Nav>
          <Logo onClick={() => handleNavigation("/")}>
            <Sparkles size={24} />
            Vibeco
          </Logo>

          <NavLinks isOpen={isMobileMenuOpen}>
            <NavLink onClick={() => handleNavigation("#features")}>
              Features
            </NavLink>
            <NavLink onClick={() => handleNavigation("#platform")}>
              Platform
            </NavLink>
            <NavLink onClick={() => handleNavigation("#pricing")}>
              Pricing
            </NavLink>
            <NavLink onClick={() => handleNavigation("#docs")}>Docs</NavLink>

            <ButtonGroup>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation("/login")}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavigation("/signup")}
              >
                Get Started
              </Button>
            </ButtonGroup>
          </NavLinks>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </Nav>
      </Header>

      <HeroSection>
        <MaxWidthWrapper>
          <HeroContent>
            <HeroTitle>
              Build your creator
              <br />
              business with confidence
            </HeroTitle>
            <HeroSubtitle>
              The all-in-one platform for creators to discover brand
              partnerships, manage campaigns, and grow their business with
              powerful analytics and secure payments.
            </HeroSubtitle>
            <HeroActions>
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleNavigation("/home")}
              >
                Start Creating
                <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigation("/demo")}
              >
                View Demo
                <ExternalLink size={20} />
              </Button>
            </HeroActions>

            <BlurOverlay />
            <HeroImageContainer>
              <HeroImage>
                <DashboardPreview
                  src="https://ik.imagekit.io/i3divn77k/MVP/Screenshot%202025-05-26%20at%201.51.12%E2%80%AFAM.png?updatedAt=1748204540499"
                  alt="Vibeco Dashboard"
                />

                <FloatingCard position="top: 20px; left: 20px;" delay={0}>
                  <CardValue>25%</CardValue>
                  <CardLabel>Engagement Boost</CardLabel>
                </FloatingCard>

                <FloatingCard position="bottom: 20px; right: 20px;" delay={1}>
                  <CardValue>$1,200</CardValue>
                  <CardLabel>Avg. Campaign Value</CardLabel>
                </FloatingCard>
              </HeroImage>
            </HeroImageContainer>
          </HeroContent>
        </MaxWidthWrapper>
      </HeroSection>

      {/* Enhanced Stats Section */}
      <StatsSection>
        <MaxWidthWrapper>
          <SectionTitle
            style={{
              textAlign: "center",
              marginBottom: theme.spacing[8],
              // fontFamily: "'Comic Sans MS', cursive, sans-serif",
            }}
          >
            Amazing Results
          </SectionTitle>
          <StatsGrid>
            <StatItem>
              <StatNumber>10K+</StatNumber>
              <StatLabel>Creators Joined</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>$2M+</StatNumber>
              <StatLabel>Paid to Creators</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Brands Partnered</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>99%</StatNumber>
              <StatLabel>Satisfaction Rate</StatLabel>
            </StatItem>
          </StatsGrid>
        </MaxWidthWrapper>
      </StatsSection>

      {/* Enhanced Feature Sections */}
      <FeatureSectionWrapper
        id="analytics-section"
        data-animate
        isVisible={visibleSections.has("analytics-section")}
      >
        <MaxWidthWrapper>
          <FeatureSectionContent
            isVisible={visibleSections.has("analytics-section")}
          >
            <FeatureSectionText
              isVisible={visibleSections.has("analytics-section")}
            >
              <FeatureSectionTitle>Advanced Analytics</FeatureSectionTitle>
              <FeatureSectionDescription>
                Get deep insights into your audience, engagement rates, and
                campaign performance with our comprehensive analytics dashboard.
                Make data-driven decisions to maximize your earning potential.
              </FeatureSectionDescription>
              <FeatureSectionList>
                <FeatureSectionListItem>
                  Real-time performance tracking across all platforms
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Audience demographics and engagement insights
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Campaign ROI and conversion analytics
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Competitor benchmarking and market trends
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Custom reports and data visualization
                </FeatureSectionListItem>
              </FeatureSectionList>
            </FeatureSectionText>
            <FeatureSectionImage
              isVisible={visibleSections.has("analytics-section")}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-analytics-dashboard-with-charts-graphs-and--aNanatJxvn3K14pL3sNMj0T2crk1vi.png"
                alt="Advanced Analytics Dashboard"
              />
            </FeatureSectionImage>
          </FeatureSectionContent>
        </MaxWidthWrapper>
      </FeatureSectionWrapper>

      <FeatureSectionWrapper
        id="payments-section"
        data-animate
        isVisible={visibleSections.has("payments-section")}
      >
        <MaxWidthWrapper>
          <FeatureSectionContent
            isVisible={visibleSections.has("payments-section")}
            reverse
          >
            <FeatureSectionText
              isVisible={visibleSections.has("payments-section")}
              reverse
            >
              <FeatureSectionTitle>Instant Payments</FeatureSectionTitle>
              <FeatureSectionDescription>
                Secure, automated payment processing with escrow protection. Get
                paid instantly when campaigns are completed with full
                transparency and protection for both creators and brands.
              </FeatureSectionDescription>
              <FeatureSectionList>
                <FeatureSectionListItem>
                  Instant payment processing upon campaign completion
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Secure escrow protection for all transactions
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Multiple payment methods and currencies supported
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Automated invoicing and tax documentation
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Transparent fee structure with no hidden costs
                </FeatureSectionListItem>
              </FeatureSectionList>
            </FeatureSectionText>
            <FeatureSectionImage
              isVisible={visibleSections.has("payments-section")}
              reverse
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/secure-payment-processing-interface-with-credit-ca-uVtKHRMAKfjGxu0gTjgjyCAQPzd5d5.png"
                alt="Instant Payments System"
              />
            </FeatureSectionImage>
          </FeatureSectionContent>
        </MaxWidthWrapper>
      </FeatureSectionWrapper>

      {/* Dedicated Smart Matching Section */}
      <FeatureSectionWrapper
        id="matching-section"
        data-animate
        isVisible={visibleSections.has("matching-section")}
      >
        <MaxWidthWrapper>
          <FeatureSectionContent
            isVisible={visibleSections.has("matching-section")}
          >
            <FeatureSectionText
              isVisible={visibleSections.has("matching-section")}
            >
              <FeatureSectionTitle>Smart Matching</FeatureSectionTitle>
              <FeatureSectionDescription>
                AI-powered brand matching that connects you with the perfect
                partnerships based on your audience and content style. Our
                intelligent algorithm analyzes your profile to find brands that
                align with your values and audience.
              </FeatureSectionDescription>
              <FeatureSectionList>
                <FeatureSectionListItem>
                  AI-driven brand compatibility analysis
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Audience alignment and demographic matching
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Content style and niche optimization
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Personalized partnership recommendations
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Success rate prediction and optimization
                </FeatureSectionListItem>
              </FeatureSectionList>
            </FeatureSectionText>
            <FeatureSectionImage
              isVisible={visibleSections.has("matching-section")}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/ai-powered-matching-algorithm-interface-showing-br-vm3tse5dtwErAvEvTTkBc1bQj0mPqL.png"
                alt="Smart Matching AI System"
              />
            </FeatureSectionImage>
          </FeatureSectionContent>
        </MaxWidthWrapper>
      </FeatureSectionWrapper>

      {/* Dedicated Legal Protection Section */}
      <FeatureSectionWrapper
        id="legal-section"
        data-animate
        isVisible={visibleSections.has("legal-section")}
      >
        <MaxWidthWrapper>
          <FeatureSectionContent
            isVisible={visibleSections.has("legal-section")}
            reverse
          >
            <FeatureSectionText
              isVisible={visibleSections.has("legal-section")}
              reverse
            >
              <FeatureSectionTitle>Legal Protection</FeatureSectionTitle>
              <FeatureSectionDescription>
                Comprehensive contract templates and legal protection to ensure
                fair partnerships and secure collaborations. Protect your rights
                and interests with professionally crafted legal documents and
                expert support.
              </FeatureSectionDescription>
              <FeatureSectionList>
                <FeatureSectionListItem>
                  Pre-vetted contract templates for all partnership types
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Legal review and consultation services
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Intellectual property protection and licensing
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Dispute resolution and mediation support
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Compliance monitoring and regulatory updates
                </FeatureSectionListItem>
              </FeatureSectionList>
            </FeatureSectionText>
            <FeatureSectionImage
              isVisible={visibleSections.has("legal-section")}
              reverse
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/legal-contract-documents-and-protection-interface-lr6OmpJ80OgsHwtv43HT3SKKbMHj8i.png"
                alt="Legal Protection System"
              />
            </FeatureSectionImage>
          </FeatureSectionContent>
        </MaxWidthWrapper>
      </FeatureSectionWrapper>

      {/* Dedicated Community Support Section */}
      <FeatureSectionWrapper
        id="community-section"
        data-animate
        isVisible={visibleSections.has("community-section")}
      >
        <MaxWidthWrapper>
          <FeatureSectionContent
            isVisible={visibleSections.has("community-section")}
          >
            <FeatureSectionText
              isVisible={visibleSections.has("community-section")}
            >
              <FeatureSectionTitle>Community Support</FeatureSectionTitle>
              <FeatureSectionDescription>
                Connect with other creators, share insights, and grow together
                in our supportive creator community. Access exclusive networking
                events, mentorship programs, and collaborative opportunities.
              </FeatureSectionDescription>
              <FeatureSectionList>
                <FeatureSectionListItem>
                  Active creator community forums and discussions
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Mentorship programs with successful creators
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Exclusive networking events and workshops
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Collaboration opportunities and cross-promotion
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  24/7 support and expert guidance
                </FeatureSectionListItem>
              </FeatureSectionList>
            </FeatureSectionText>
            <FeatureSectionImage
              isVisible={visibleSections.has("community-section")}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/creator-community-network-interface-showing-conne-TJsLGTiI3pgIGlFJw8kkmuQY8kd5Jm.png"
                alt="Community Support Platform"
              />
            </FeatureSectionImage>
          </FeatureSectionContent>
        </MaxWidthWrapper>
      </FeatureSectionWrapper>

      {/* Dedicated Campaign Management Section */}
      <FeatureSectionWrapper
        id="campaign-section"
        data-animate
        isVisible={visibleSections.has("campaign-section")}
      >
        <MaxWidthWrapper>
          <FeatureSectionContent
            isVisible={visibleSections.has("campaign-section")}
            reverse
          >
            <FeatureSectionText
              isVisible={visibleSections.has("campaign-section")}
              reverse
            >
              <FeatureSectionTitle>Campaign Management</FeatureSectionTitle>
              <FeatureSectionDescription>
                Streamlined tools to manage all your brand partnerships,
                deadlines, and deliverables in one organized place. Stay on top
                of your campaigns with automated reminders, progress tracking,
                and performance monitoring.
              </FeatureSectionDescription>
              <FeatureSectionList>
                <FeatureSectionListItem>
                  Centralized campaign dashboard and timeline
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Automated deadline reminders and notifications
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Content approval workflows and feedback loops
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Performance tracking and milestone management
                </FeatureSectionListItem>
                <FeatureSectionListItem>
                  Integrated communication tools with brands
                </FeatureSectionListItem>
              </FeatureSectionList>
            </FeatureSectionText>
            <FeatureSectionImage
              isVisible={visibleSections.has("campaign-section")}
              reverse
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/campaign-management-dashboard-with-timeline-and-ta-zKyZr3lbBNoivIT2z0D1gmKT6RJVhQ.png"
                alt="Campaign Management Dashboard"
              />
            </FeatureSectionImage>
          </FeatureSectionContent>
        </MaxWidthWrapper>
      </FeatureSectionWrapper>
      {/* 
      <FeaturesSection id="features">
        <MaxWidthWrapper>
          <SectionHeader>
            <SectionTitle>Everything you need to grow</SectionTitle>
            <SectionSubtitle>
              Discover the tools built for creators to find brand deals, manage
              partnerships, and grow their income — all in one place.
            </SectionSubtitle>
          </SectionHeader>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </MaxWidthWrapper>
      </FeaturesSection> */}
      <DecorativeSection>
        <MaxWidthWrapper>
          <SectionTitle
            style={{
              textAlign: "center",
              // fontFamily: "'Comic Sans MS', cursive, sans-serif",
              color: "#1f2937",
            }}
          >
            Fun Facts About Our Platform
          </SectionTitle>
          <FunFactsGrid>
            <FunFactCard>
              <FunFactText>
                Average campaign setup takes just 5 minutes!
              </FunFactText>
            </FunFactCard>
            <FunFactCard>
              <FunFactText>Creators see 3x faster brand responses</FunFactText>
            </FunFactCard>
            <FunFactCard>
              <FunFactText>Top creators earn $50K+ monthly</FunFactText>
            </FunFactCard>
          </FunFactsGrid>
        </MaxWidthWrapper>
      </DecorativeSection>
      <CTASection>
        <MaxWidthWrapper>
          <CTAContent>
            <CTATitle>Ready to start your creator journey?</CTATitle>
            <CTADescription>
              Join thousands of creators building powerful brand partnerships
              and making a living doing what they love.
            </CTADescription>
            <CTAActions>
              <CTAButton onClick={() => handleNavigation("/signup")}>
                Join Now
              </CTAButton>
              <CTAButtonSecondary onClick={() => handleNavigation("/demo")}>
                Watch Demo
              </CTAButtonSecondary>
            </CTAActions>
          </CTAContent>
        </MaxWidthWrapper>
      </CTASection>

      <Footer>
        <FooterContent>
          <FooterSection>
            <Logo>
              <Sparkles size={24} />
              Vibeco
            </Logo>
            <FooterDescription>
              Empowering creators to connect with brands and grow their
              business. Simple. Secure. Scalable.
            </FooterDescription>
            <SocialLinks>
              <SocialLink href="#">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href="#">
                <Youtube size={20} />
              </SocialLink>
              <SocialLink href="#">
                <Twitter size={20} />
              </SocialLink>
              <SocialLink href="#">
                <Globe size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Platform</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <a onClick={() => handleNavigation("#features")}>Features</a>
              </FooterLink>
              <FooterLink>
                <a onClick={() => handleNavigation("#platform")}>Platform</a>
              </FooterLink>
              <FooterLink>
                <a onClick={() => handleNavigation("#pricing")}>Pricing</a>
              </FooterLink>
              <FooterLink>
                <a onClick={() => handleNavigation("#docs")}>Documentation</a>
              </FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Company</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <a href="#">About Us</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Careers</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Press</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Blog</a>
              </FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Support</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <a href="#">Help Center</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Privacy Policy</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Terms of Service</a>
              </FooterLink>
              <FooterLink>
                <a href="#">Contact</a>
              </FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            &copy; {new Date().getFullYear()} Vibeco. All rights reserved.
          </Copyright>
        </FooterBottom>
      </Footer>
    </LandingPageContainer>
  );
};

export default ModernLandingPage;
