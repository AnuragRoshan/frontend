const sharedTheme = {
  typography: {
    fontSizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
      display: "32px",
      xxxl: "36px",
    },
    fontWeights: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      sm: "1.4",
      md: "1.6",
      lg: "1.8",
    },
  },
  spacing: {
    xxs: "2px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "40px",
  },
  borderRadius: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "20px",
    full: "9999px",
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  breakpoints: {
    xs: "0px",
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1536px",
  },
  transitions: {
    fast: "150ms ease-in-out",
    normal: "300ms ease-in-out",
    slow: "500ms ease-in-out",
  },
  opacity: {
    disabled: 0.4,
    hover: 0.8,
    focus: 0.9,
    active: 1,
  },
  shadows: {
    custom: "2px 5px 10px #a5a5a5",
    xs: "0 0 1px rgba(0,0,0,0.05)",
    sm: "0 1px 2px rgba(0,0,0,0.1)",
    md: "0 4px 12px rgba(0,0,0,0.15)",
    lg: "0 4px 8px rgba(0,0,0,0.2)",
    xl: "0 8px 16px rgba(0,0,0,0.25)",
    xxl: "0 12px 24px rgba(0,0,0,0.3)",
    inset: "inset 0 1px 2px rgba(0,0,0,0.1)",
  },
  effects: {
    hover: {
      backgroundLight: "rgba(0, 0, 0, 0.1)",
      backgroundDark: "rgba(255, 255, 255, 0.1)",
      shadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
      scale: "scale(1.02)",
    },
    focus: {
      ring: "0 0 0 3px rgba(59, 130, 246, 0.6)",
    },
    disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    backdrop: {
      blur: "blur(8px)",
      dim: "rgba(0, 0, 0, 0.4)",
    },
  },

  colorVariants: {
    primary: {
      lighter: "#7BA9F5",
      light: "#3B82F6",
      dark: "#1E3A8A",
      darker: "#162A6B",
    },
    secondary: {
      lighter: "#A3B3C9",
      light: "#64748B",
      dark: "#334155",
      darker: "#1E293B",
    },
    error: {
      light: "#F87171",
      dark: "#991B1B",
    },
  },

  components: {
    button: {
      padding: {
        sm: "8px 14px",
        md: "12px 18px",
        lg: "16px 24px",
      },
      borderRadius: "6px",
      transition: "all 0.3s ease",
      colors: {
        default: {
          background: "#2563EB",
          text: "#FFFFFF",
          hoverBackground: "#1E40AF",
          disabledBackground: "#93C5FD",
          disabledText: "#E0E7FF",
        },
        secondary: {
          background: "#D1D5DB",
          text: "#1F2937",
          hoverBackground: "#9CA3AF",
          disabledBackground: "#F3F4F6",
          disabledText: "#6B7280",
        },
        dark: {
          background: "#1F2937",
          text: "#FFFFFF",
          hoverBackground: "#111827",
          disabledBackground: "#4B5563",
          disabledText: "#D1D5DB",
        },
      },
    },
    input: {
      borderColor: "#9CA3AF",
      focusBorderColor: "#2563EB",
      errorBorderColor: "#B91C1C",
      borderRadius: "12px",
      padding: "8px 12px",
      backgroundColor: "#d4eaf5",
    },
    card: {
      padding: "16px",
      borderRadius: "16px",
      shadow: "lg",
    },
    modal: {
      backdropColor: "rgba(0,0,0,0.4)",
      borderRadius: "16px",
      zIndex: 1050,
    },
    table: {
      headerBg: "#E5E7EB",
      borderColor: "#9CA3AF",
      rowHoverBg: "rgba(0, 0, 0, 0.05)",
    },
    list: {
      itemSpacing: "8px",
    },
    sidebar: {
      backgroundLight: "#09162c",
      textLight: "#b3b7bd",
      backgroundDark: "#ffffff",
      textDark: "#000000",
    },
  },

  semanticColors: {
    success: "#059669",
    error: "#B91C1C",
    warning: "#D97706",
    info: "#2563EB",
    focus: "#1E40AF",
    selection: "#7BA9F5",
    disabledBg: "#E5E7EB",
  },

  elevation: {
    level0: "none",
    level1: "0 1px 2px rgba(0, 0, 0, 0.1)",
    level2: "0 2px 4px rgba(0, 0, 0, 0.15)",
    level3: "0 4px 8px rgba(0, 0, 0, 0.2)",
    level4: "0 8px 16px rgba(0, 0, 0, 0.25)",
  },

  animations: {
    bounce: "bounce 1s ease infinite",
    fadeIn: "fadeIn 300ms ease-in",
    slideUp: "slideUp 400ms ease",
  },

  grid: {
    columns: 12,
    gutter: "16px",
    maxWidth: "1280px",
  },

  icons: {
    sizes: {
      sm: "16px",
      md: "20px",
      lg: "24px",
      xl: "32px",
    },
    colors: {
      primary: "#2563EB",
      secondary: "#64748B",
      muted: "#4B5563",
    },
  },

  accessibility: {
    highContrastText: "#111827",
    focusRing: "0 0 0 3px rgba(59, 130, 246, 0.7)",
  },

  mediaQueries: {
    up: (bp: string) => `@media (min-width: ${bp})`,
    down: (bp: string) => `@media (max-width: ${bp})`,
  },

  themeSwitching: {
    key: "app_theme",
    values: ["light", "dark"],
  },

  globalStyles: {
    resetCSS: true,
    baseFontSize: "16px",
  },

  extendedDesignTokens: {
    tertiary: {
      base: "#9333EA",
      light: "#C084FC",
      dark: "#6B21A8",
    },
    neutral: {
      light: "#E5E7EB",
      base: "#6B7280",
      dark: "#374151",
    },
    brand: {
      primary: "#1E40AF",
      accent: "#D97706",
    },
    gradients: {
      primary: "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)",
      accent: "linear-gradient(90deg, #D97706 0%, #F59E0B 100%)",
      auth: "linear-gradient(180deg, #7BA9F5 0%, white 100%)",
      blue: "linear-gradient(180deg, #2563EB 0%, #7BA9F5 100%)",
      purple: "linear-gradient(180deg, #9333EA 0%, #C084FC 100%)",
      pink: "linear-gradient(180deg, #DB2777 0%, #FBCFE8 100%)",
      orange: "linear-gradient(180deg, #D97706 0%, #FDE68A 100%)",
      green: "linear-gradient(180deg, #059669 0%, #BBF7D0 100%)",
      gray: "linear-gradient(180deg, #4B5563 0%, #E5E7EB 100%)",
      gold: "linear-gradient(180deg, #D97706 0%, #FDE68A 100%)",
    },
    viewport: {
      vw1: "1vw",
      vh1: "1vh",
    },
    customCSSVars: {
      "--app-accent": "#D97706",
    },
  },

  typographyExtras: {
    truncation: {
      singleLine:
        "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
      multiLineClamp: (lines: number) =>
        `display: -webkit-box; -webkit-line-clamp: ${lines}; -webkit-box-orient: vertical; overflow: hidden;`,
    },
    headings: {
      h1: "font-size: 32px; font-weight: 700;",
      h2: "font-size: 28px; font-weight: 600;",
      h3: "font-size: 24px; font-weight: 600;",
      h4: "font-size: 20px; font-weight: 500;",
      h5: "font-size: 18px; font-weight: 500;",
      h6: "font-size: 16px; font-weight: 500;",
    },
    specialText: {
      code: "font-family: monospace; background: #E5E7EB; padding: 2px 4px;",
      quote:
        "font-style: italic; border-left: 4px solid #9CA3AF; padding-left: 12px;",
    },
    fontFeatures: {
      stylisticAlternates: 'font-feature-settings: "salt";',
      ligatures: 'font-feature-settings: "liga";',
    },
  },

  layoutSystem: {
    flexUtilities: true,
    grid: true,
    container: {
      maxWidth: "1280px",
      padding: "0 16px",
    },
    aspectRatios: {
      square: "1 / 1",
      video: "16 / 9",
    },
    stickyHelpers: {
      topBar: "position: sticky; top: 0; z-index: 1050;",
    },
  },

  componentStyles: {
    nav: {},
    tabs: {},
    loader: {},
    tooltip: {},
    badge: {},
    progress: {},
    pagination: {},
    alert: {},
    image: {},
    toggle: {},
    dropdown: {},
    slider: {},
  },

  formStyles: {
    radio: {},
    checkbox: {},
    select: {},
    textarea: {},
    search: {},
    layout: {},
    label: {},
    validation: {},
    fileUpload: {},
  },

  interactiveStates: {
    active: "background-color: #D1E9F5;",
    visited: "color: #6B21A8;",
    pressed: "transform: scale(0.98);",
    loading: {},
    skeleton: {},
    dragDrop: {},
  },

  animationsExtra: {
    keyframes: {},
    entrance: {},
    attention: {},
    loading: {},
    state: {},
  },

  responsive: {
    visibility: {},
    typographyScaling: true,
    componentRules: {},
    touchAdjustments: true,
    printStyles: {},
  },

  darkModeExtras: {
    componentVariants: true,
    imageFilters: "filter: brightness(0.8) contrast(1.2);",
    detector: "prefers-color-scheme",
    cssVars: true,
  },

  a11y: {
    skipLinks: true,
    ariaHelpers: true,
    screenReaderOnly: true,
    keyboardNav: true,
    reduceMotion: "prefers-reduced-motion: reduce",
  },

  helperUtilities: {
    spacing: true,
    display: true,
    textAlign: true,
    overflow: true,
    position: true,
  },

  docs: {
    usage: true,
    previews: true,
    guidelines: true,
    snippets: true,
    patterns: true,
  },

  implementation: {
    reset: true,
    cssInJs: true,
    styledComponents: true,
    cssModules: true,
    utilityFirst: true,
  },

  performance: {
    criticalCss: true,
    lazyLoad: true,
    bundleSplit: true,
    cssMinify: true,
  },

  integration: {
    frameworkAdapters: true,
    connectorUtilities: true,
    themeOverrides: true,
  },
};

export const lightTheme = {
  ...sharedTheme,
  colors: {
    background: "#FFFFFF",
    surface: "#F5F5F5",
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
    sidebarBackground: "#09162c",
    sidebarText: "#b3b7bd",
  },
};

export const darkTheme = {
  ...sharedTheme,
  colors: {
    background: "#1F2937",
    surface: "#374151",
    primary: "#60A5FA",
    primaryDark: "#3B82F6",
    secondary: "#9CA3AF",
    textPrimary: "#F9FAFB",
    textSecondary: "#D1D5DB",
    border: "#4B5563",
    error: "#F87171",
    success: "#34D399",
    warning: "#FBBF24",
    info: "#60A5FA",
    sidebarBackground: "#ffffff",
    sidebarText: "#000000",
  },
};

export { sharedTheme };
