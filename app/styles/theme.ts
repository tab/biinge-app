export interface Theme {
  dark: boolean
  colors: {
    primary: string
    background: string
    card: string
    text: string
    textSecondary: string
    border: string
    notification: string
  }
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: "#eec01e",
    background: "#fff",
    card: "#fafafa",
    text: "#181818",
    textSecondary: "#2b2835",
    border: "#d1cecf",
    notification: "#9f0909",
  },
}

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#eec01e",
    background: "#000",
    card: "#181818",
    text: "#fafafa",
    textSecondary: "#d4d7ca",
    border: "#2e3130",
    notification: "#9f0909",
  },
}
