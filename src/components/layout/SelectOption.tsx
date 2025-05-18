import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Check } from "lucide-react";
import { lightTheme as theme } from "../../styles/theme/theme";

interface Option {
  label: string;
  value: string;
}

interface SelectOptionProps {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultValue || "");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setOpen(false);
  };

  return (
    <div ref={ref}>
      <DropdownTrigger onClick={() => setOpen(!open)}>
        {selected || "Select option"}
      </DropdownTrigger>
      {open && (
        <OptionsContainer>
          {options.map((opt) => (
            <OptionItem
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              isSelected={selected === opt.value}
            >
              <span>{opt.label}</span>
              {selected === opt.value && <Check size={16} />}
            </OptionItem>
          ))}
        </OptionsContainer>
      )}
    </div>
  );
};

export default SelectOption;

const DropdownTrigger = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background};
  color: ${theme.colors.textPrimary};
  cursor: pointer;
  transition: ${theme.transitions.normal};

  &:hover {
    background-color: ${theme.effects.hover.backgroundLight};
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  background: white;
  border: 1px solid ${theme.colorVariants.primary.lighter};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs};
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.slow};
  margin-top: ${theme.spacing.xs};
  width: 85%;
  position: absolute;
  z-index: 10;
`;

const OptionItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? theme.colorVariants.primary.lighter : "transparent"};
  color: ${({ isSelected }) =>
    isSelected ? theme.colorVariants.link : theme.colorVariants.secondary};
  transition: ${theme.transitions.normal};

  &:hover {
    background-color: ${theme.effects.hover.backgroundLight};
  }
`;
