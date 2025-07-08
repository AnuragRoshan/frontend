import React from "react";
import styled from "styled-components";
import { theme, getPriorityColor } from "../theme"; // <-- Update the path as needed
// import { Filter, CheckCircle, AlertCircle, Clock } from "lucide-react";

import { Filter, CheckCircle, AlertCircle, Clock } from "lucide-react";

interface Task {
  id: string | number;
  title: string;
  dueDate: string;
  description: string;
  campaign: string;
  priority: "high" | "medium" | "low";
}

interface TasksSectionProps {
  tasks: Task[];
}

const TasksSection: React.FC<TasksSectionProps> = ({ tasks }) => {
  const getTasksByPriority = (priority: string) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const getPriorityCount = (priority: string) => {
    return getTasksByPriority(priority).length;
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Tasks & Notifications</SectionTitle>
        <HeaderActions>
          <FilterButton>
            <Filter size={16} />
            Priority
          </FilterButton>
          <ActionButton>
            <CheckCircle size={16} />
            Mark All Read
          </ActionButton>
        </HeaderActions>
      </SectionHeader>

      <TasksGrid>
        <TasksColumn>
          <ColumnHeader priority="high">
            <AlertCircle size={16} />
            High Priority ({getPriorityCount("high")})
          </ColumnHeader>
          {getTasksByPriority("high").map((task) => (
            <TaskCard key={task.id} priority={task.priority}>
              <TaskCardHeader>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDue>{task.dueDate}</TaskDue>
              </TaskCardHeader>
              <TaskDescription>{task.description}</TaskDescription>
              <TaskCampaign>{task.campaign}</TaskCampaign>
              <TaskCardActions>
                <ActionButton small primary>
                  Take Action
                </ActionButton>
                <ActionButton small>View Details</ActionButton>
              </TaskCardActions>
            </TaskCard>
          ))}
        </TasksColumn>

        <TasksColumn>
          <ColumnHeader priority="medium">
            <Clock size={16} />
            Medium Priority ({getPriorityCount("medium")})
          </ColumnHeader>
          {getTasksByPriority("medium").map((task) => (
            <TaskCard key={task.id} priority={task.priority}>
              <TaskCardHeader>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDue>{task.dueDate}</TaskDue>
              </TaskCardHeader>
              <TaskDescription>{task.description}</TaskDescription>
              <TaskCampaign>{task.campaign}</TaskCampaign>
              <TaskCardActions>
                <ActionButton small primary>
                  Take Action
                </ActionButton>
                <ActionButton small>View Details</ActionButton>
              </TaskCardActions>
            </TaskCard>
          ))}
        </TasksColumn>

        <TasksColumn>
          <ColumnHeader priority="low">
            <CheckCircle size={16} />
            Low Priority ({getPriorityCount("low")})
          </ColumnHeader>
          {getTasksByPriority("low").map((task) => (
            <TaskCard key={task.id} priority={task.priority}>
              <TaskCardHeader>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDue>{task.dueDate}</TaskDue>
              </TaskCardHeader>
              <TaskDescription>{task.description}</TaskDescription>
              <TaskCampaign>{task.campaign}</TaskCampaign>
              <TaskCardActions>
                <ActionButton small primary>
                  Take Action
                </ActionButton>
                <ActionButton small>View Details</ActionButton>
              </TaskCardActions>
            </TaskCard>
          ))}
        </TasksColumn>
      </TasksGrid>
    </SectionContainer>
  );
};

// Styled Components
const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  margin: 0;
  color: ${theme.colors.textPrimary};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.border};
  }
`;

interface ActionButtonProps {
  primary?: boolean;
  small?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${(props) =>
    props.small
      ? `${theme.spacing.sm} ${theme.spacing.md}`
      : `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${(props) =>
    props.primary ? theme.colors.primary : theme.colors.surface};
  border: 1px solid
    ${(props) => (props.primary ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  font-size: ${(props) =>
    props.small
      ? theme.typography.fontSizes.xs
      : theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${(props) =>
    props.primary ? theme.colors.background : theme.colors.textPrimary};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? theme.colors.primaryDark : theme.colors.border};
    transform: translateY(-1px);
  }
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const TasksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

interface ColumnHeaderProps {
  priority: string;
}

const ColumnHeader = styled.div<ColumnHeaderProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background-color: ${(props) => {
    const color = getPriorityColor(props.priority);
    return `${color}10`;
  }};
  border: 1px solid
    ${(props) => {
      const color = getPriorityColor(props.priority);
      return `${color}30`;
    }};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${(props) => getPriorityColor(props.priority)};
`;

interface TaskCardProps {
  priority: string;
}

const TaskCard = styled.div<TaskCardProps>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-left: 4px solid ${(props) => getPriorityColor(props.priority)};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
`;

const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
`;

const TaskTitle = styled.h4`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin: 0;
  color: ${theme.colors.textPrimary};
  flex: 1;
`;

const TaskDue = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
  white-space: nowrap;
`;

const TaskDescription = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  margin: 0;
  line-height: 1.4;
`;

const TaskCampaign = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const TaskCardActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`;

export default TasksSection;
