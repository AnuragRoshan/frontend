import React, { useEffect, useState, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { X } from "lucide-react";
import { sharedTheme } from "../../styles/theme/theme";

type DrawerSize = "sm" | "md" | "lg" | "xl";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  size?: DrawerSize;
  anchor?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventScrollLock?: boolean;
  className?: string;
  maxWidth?: string;
  onAnimationComplete?: () => void;
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideInRight = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideOutRight = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const slideOutLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const slideInTop = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const slideOutTop = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
`;

const slideInBottom = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideOutBottom = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

// Styled Components
const Overlay = styled.div<{
  isVisible: boolean;
  isAnimating: boolean;
  closeOnOverlayClick: boolean;
}>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: ${sharedTheme.zIndex.modalBackdrop};
  animation: ${({ isVisible, isAnimating }) =>
      isAnimating ? (isVisible ? fadeIn : fadeOut) : "none"}
    0.3s ease-out forwards;
  cursor: ${({ closeOnOverlayClick }) =>
    closeOnOverlayClick ? "pointer" : "default"};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  }
`;

const DrawerContainer = styled.div<{
  size: DrawerSize;
  isVisible: boolean;
  isAnimating: boolean;
  anchor: "left" | "right" | "top" | "bottom";
  maxWidth?: string;
}>`
  position: fixed;
  background-color: white;
  z-index: ${sharedTheme.zIndex.modal};
  box-shadow: ${sharedTheme.shadows.xxl};
  display: flex;
  flex-direction: column;

  /* Size and positioning based on anchor */
  ${({ anchor, size, maxWidth }) => {
    const getSize = () => {
      if (maxWidth) return maxWidth;
      switch (size) {
        case "sm":
          return "320px";
        case "md":
          return "480px";
        case "lg":
          return "640px";
        case "xl":
          return "800px";
        default:
          return "480px";
      }
    };

    switch (anchor) {
      case "left":
      case "right":
        return `
          top: 0;
          ${anchor}: 0;
          height: 100vh;
          width: ${getSize()};
          max-width: 90vw;
          border-radius: 0;
        `;
      case "top":
      case "bottom":
        return `
          left: 0;
          ${anchor}: 0;
          width: 100vw;
          height: ${getSize()};
          max-height: 90vh;
          border-radius: 0;
        `;
      default:
        return `
          top: 0;
          right: 0;
          height: 100vh;
          width: ${getSize()};
          max-width: 90vw;
        `;
    }
  }}

  /* Animations */
  animation: ${({ isVisible, isAnimating, anchor }) => {
    if (!isAnimating) return "none";

    if (isVisible) {
      switch (anchor) {
        case "left":
          return slideInLeft;
        case "right":
          return slideInRight;
        case "top":
          return slideInTop;
        case "bottom":
          return slideInBottom;
        default:
          return slideInRight;
      }
    } else {
      switch (anchor) {
        case "left":
          return slideOutLeft;
        case "right":
          return slideOutRight;
        case "top":
          return slideOutTop;
        case "bottom":
          return slideOutBottom;
        default:
          return slideOutRight;
      }
    }
  }} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: ${({ isVisible, anchor }) => {
      if (isVisible) return "none";
      switch (anchor) {
        case "left":
          return "translateX(-100%)";
        case "right":
          return "translateX(100%)";
        case "top":
          return "translateY(-100%)";
        case "bottom":
          return "translateY(100%)";
        default:
          return "translateX(100%)";
      }
    }};
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    ${({ anchor }) =>
      anchor === "left" || anchor === "right"
        ? "width: 85vw; max-width: 400px;"
        : "height: 80vh; max-height: 600px;"}
  }

  @media (max-width: 480px) {
    ${({ anchor }) =>
      anchor === "left" || anchor === "right"
        ? "width: 95vw;"
        : "height: 90vh;"}
  }
`;

const DrawerHeader = styled.div<{ hasTitle: boolean }>`
  display: ${({ hasTitle }) => (hasTitle ? "flex" : "block")};
  justify-content: space-between;
  align-items: center;
  padding: ${({ hasTitle }) =>
    hasTitle ? "1.5rem 1.5rem 1rem 1.5rem" : "1rem 1rem 0 1rem"};
  border-bottom: ${({ hasTitle }) => (hasTitle ? "1px solid #e5e7eb" : "none")};
  flex-shrink: 0;
  position: relative;
`;

const DrawerTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.2;
`;

const CloseButton = styled.button<{
  anchor: "left" | "right" | "top" | "bottom";
  hasTitle: boolean;
}>`
  position: ${({ hasTitle }) => (hasTitle ? "static" : "absolute")};
  top: ${({ hasTitle }) => (hasTitle ? "auto" : "1rem")};
  right: ${({ hasTitle, anchor }) => {
    if (hasTitle) return "auto";
    if (anchor === "left") return "auto";
    if (anchor === "right") return "1rem";
    return "1rem";
  }};
  left: ${({ hasTitle, anchor }) => {
    if (hasTitle) return "auto";
    if (anchor === "left") return "1rem";
    return "auto";
  }};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    background-color: #f3f4f6;
    color: ${sharedTheme.colorVariants.secondary.darker};
  }

  &:focus {
    outline: none;
    background-color: #f3f4f6;
    box-shadow: 0 0 0 2px ${sharedTheme.colorVariants.primary.dark}40;
  }

  &:active {
    background-color: #e5e7eb;
    transform: scale(0.95);
  }
`;

const DrawerContent = styled.div<{
  anchor: "left" | "right" | "top" | "bottom";
  hasTitle: boolean;
}>`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${({ hasTitle }) =>
    hasTitle ? "1.5rem 1.5rem 0rem 1.5rem" : "3rem 1.5rem 0rem 1.5rem"};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a8a8a8;
    }
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
`;

// Component
const Drawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  size = "md",
  anchor = "right",
  children,
  title,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventScrollLock = false,
  className,
  maxWidth,
  onAnimationComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle opening
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Lock scroll
      if (!preventScrollLock) {
        document.body.style.overflow = "hidden";
      }

      requestAnimationFrame(() => {
        setIsVisible(true);
        setIsAnimating(true);

        // Focus management
        setTimeout(() => {
          if (showCloseButton && closeButtonRef.current) {
            closeButtonRef.current.focus();
          } else if (drawerRef.current) {
            const focusableElement = drawerRef.current.querySelector(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) as HTMLElement;
            focusableElement?.focus();
          }
        }, 100);
      });
    } else {
      setIsVisible(false);
      setIsAnimating(true);

      // Restore scroll
      if (!preventScrollLock) {
        document.body.style.overflow = "";
      }

      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
    }
  }, [isOpen, preventScrollLock, showCloseButton]);

  // Handle animation completion
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (!isVisible) {
          setShouldRender(false);
        }
        onAnimationComplete?.();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, isVisible, onAnimationComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!preventScrollLock) {
        document.body.style.overflow = "";
      }
    };
  }, [preventScrollLock]);

  // Handle escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape" && isOpen) {
        event.preventDefault();
        onClose();
      }
    },
    [closeOnEscape, isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  // Focus trap
  const handleTabKey = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <Overlay
        isVisible={isVisible}
        isAnimating={isAnimating}
        closeOnOverlayClick={closeOnOverlayClick}
        onClick={handleOverlayClick}
        role="presentation"
      />
      <DrawerContainer
        ref={drawerRef}
        size={size}
        isVisible={isVisible}
        isAnimating={isAnimating}
        anchor={anchor}
        maxWidth={maxWidth}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        onKeyDown={handleTabKey}
      >
        <DrawerHeader hasTitle={!!title}>
          {title && <DrawerTitle id="drawer-title">{title}</DrawerTitle>}
          {showCloseButton && (
            <CloseButton
              ref={closeButtonRef}
              onClick={onClose}
              anchor={anchor}
              hasTitle={!!title}
              aria-label="Close drawer"
              type="button"
            >
              <X size={20} />
            </CloseButton>
          )}
        </DrawerHeader>

        <DrawerContent anchor={anchor} hasTitle={!!title}>
          {children}
        </DrawerContent>
      </DrawerContainer>
    </>
  );
};

export default Drawer;
