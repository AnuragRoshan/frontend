import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { X } from "lucide-react";
import { sharedTheme } from "../../styles/theme/theme";

type DrawerSize = "sm" | "md" | "lg";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  size?: DrawerSize;
  anchor?: "left" | "right";
  children: React.ReactNode;
}

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.443);
  backdrop-filter: blur(0.5px);
  z-index: ${sharedTheme.zIndex.modalBackdrop};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-out;
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
`;

const DrawerContainer = styled.div<{
  size: DrawerSize;
  isVisible: boolean;
  isMounted: boolean;
  anchor: "left" | "right";
}>`
  position: fixed;
  top: 0;
  ${({ anchor }) => (anchor === "left" ? "left: 0;" : "right: 0;")}
  height: 100%;
  width: ${({ size }) =>
    size === "lg" ? "60%" : size === "md" ? "40%" : "30%"};
  background-color: white;
  z-index: ${sharedTheme.zIndex.modal};
  box-shadow: ${sharedTheme.shadows.xl};
  transform: ${({ isMounted, isVisible, anchor }) =>
    isMounted && isVisible
      ? "translateX(0)"
      : anchor === "left"
      ? "translateX(-100%)"
      : "translateX(100%)"};
  transition: transform 0.5s ease, opacity 0.7s ease;
  display: flex;
  flex-direction: column;
  padding: ${sharedTheme.spacing.md};
`;

const CloseButton = styled.button<{
  size: DrawerSize;
  anchor: "left" | "right";
}>`
  position: absolute;
  top: ${sharedTheme.spacing.xs};
  ${({ anchor }) => (anchor === "left" ? "right: -5px;" : "left: -5px;")}
  transform: ${({ anchor }) =>
    anchor === "left" ? "translateX(100%)" : "translateX(-100%)"};
  background: white;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  padding: ${sharedTheme.spacing.xs};
  z-index: ${sharedTheme.zIndex.modal + 1};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${sharedTheme.shadows.sm};
`;

const Drawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  size = "md",
  anchor = "right",
  children,
}) => {
  const [visible, setVisible] = useState(isOpen);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => {
        setIsMounted(true);
      });
    } else {
      setIsMounted(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <>
      <Overlay isVisible={isOpen} onClick={onClose} />
      <DrawerContainer
        size={size}
        isVisible={isOpen}
        isMounted={isMounted}
        anchor={anchor}
      >
        <CloseButton onClick={onClose} size={size} anchor={anchor}>
          <X size={20} />
        </CloseButton>
        <div style={{ marginTop: "40px" }}>{children}</div>
      </DrawerContainer>
    </>
  );
};

export default Drawer;
