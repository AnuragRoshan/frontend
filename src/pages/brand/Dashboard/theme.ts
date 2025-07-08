export const theme = {
  colors: {
    background: "#FFFFFF",
    surface: "#F9FAFB",
    primary: "#3B82F6",
    primaryDark: "#2563EB",
    secondary: "#64748B",
    textPrimary: "#1F2937",
    textSecondary: "#4B5563",
    border: "#E5E7EB",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "40px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "20px",
  },
  typography: {
    fontSizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
      xxxl: "36px",
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.1)",
    md: "0 4px 12px rgba(0,0,0,0.15)",
    lg: "0 4px 8px rgba(0,0,0,0.2)",
  },
  gradients: {
    primary: "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)",
    lightBlue: "linear-gradient(180deg, #D3E6FF 0%, #FFFFFF 100%)",
  },
};

// Helper functions
export const formatNumber = (num: number): string => {
  if (num >= 10000000) return (num / 10000000).toFixed(1) + "Cr";
  if (num >= 100000) return (num / 100000).toFixed(1) + "L";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "running":
    case "live":
      return theme.colors.success;
    case "draft":
      return theme.colors.warning;
    case "ended":
      return theme.colors.secondary;
    case "paused":
      return theme.colors.error;
    default:
      return theme.colors.secondary;
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "high":
      return "#dc2626";
    case "medium":
      return theme.colors.warning;
    case "low":
      return theme.colors.success;
    default:
      return theme.colors.secondary;
  }
};
