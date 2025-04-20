import { Theme as NavigationTheme } from "@react-navigation/native"

type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"

type FontStyle = {
  fontFamily: string
  fontWeight: FontWeight
}

export interface Theme extends NavigationTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    lightCard: string;
    text: string;
    textSecondary: string;
    border: string;
    notification: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    elevation: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    };
  };
  fonts: {
    regular: FontStyle;
    medium: FontStyle;
    bold: FontStyle;
    heavy: FontStyle;
  };
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: "#eec01e",
    background: "#fff",
    card: "#fafafa",
    lightCard: "#eaeaea",
    text: "#181818",
    textSecondary: "#2b2835",
    border: "#d1cecf",
    notification: "#9f0909",
    surface: "#ffffff",
    onSurface: "#181818",
    surfaceVariant: "#f5f5f5",
    onSurfaceVariant: "#2b2835",
    outline: "#d1cecf",
    elevation: {
      level0: "transparent",
      level1: "rgb(247, 247, 247)",
      level2: "rgb(243, 243, 243)",
      level3: "rgb(237, 237, 237)",
      level4: "rgb(233, 233, 233)",
      level5: "rgb(230, 230, 230)",
    },
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "System",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "System",
      fontWeight: "900",
    },
  },
}

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#eec01e",
    background: "#000",
    card: "#181818",
    lightCard: "#282828",
    text: "#fafafa",
    textSecondary: "#d4d7ca",
    border: "#2e3130",
    notification: "#9f0909",
    surface: "#181818",
    onSurface: "#fafafa",
    surfaceVariant: "#222222",
    onSurfaceVariant: "#d4d7ca",
    outline: "#2e3130",
    elevation: {
      level0: "transparent",
      level1: "rgb(28, 28, 28)",
      level2: "rgb(35, 35, 35)",
      level3: "rgb(40, 40, 40)",
      level4: "rgb(44, 44, 44)",
      level5: "rgb(47, 47, 47)",
    },
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "System",
      fontWeight: "700",
    },
    heavy: {
      fontFamily: "System",
      fontWeight: "900",
    },
  },
}
