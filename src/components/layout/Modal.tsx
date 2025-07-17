// components/modal/Modal.tsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { X } from "lucide-react";
import { sharedTheme } from "../../styles/theme/theme";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer size={size} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {showCloseButton && (
            <CloseButton onClick={onClose}>
              <X size={20} />
            </CloseButton>
          )}
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${sharedTheme.zIndex.modal};
  padding: ${sharedTheme.spacing.md};
`;

const ModalContainer = styled.div<{ size: string }>`
  background: white;
  border-radius: ${sharedTheme.borderRadius.lg};
  box-shadow: ${sharedTheme.shadows.xxl};
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  max-width: ${(props) => {
    switch (props.size) {
      case "sm":
        return "400px";
      case "md":
        return "500px";
      case "lg":
        return "700px";
      case "xl":
        return "900px";
      default:
        return "500px";
    }
  }};

  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 95vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${sharedTheme.spacing.lg};
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${sharedTheme.colorVariants.secondary.light};
  cursor: pointer;
  border-radius: ${sharedTheme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const ModalContent = styled.div`
  padding: ${sharedTheme.spacing.lg};
`;

export default Modal;
