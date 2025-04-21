jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      push: jest.fn(),
    })),
    useTheme: jest.fn(() => ({
      dark: false,
      colors: {
        primary: "#eec01e",
        background: "#fff",
        card: "#fafafa",
        text: "#181818",
        border: "#d1cecf",
      }
    })),
    useRoute: jest.fn(() => ({})),
    createNavigationContainerRef: jest.fn(),
    // @ts-ignore
    NavigationContainer: ({ children }) => children,
  }
})

jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: jest.fn(() => ({
    // @ts-ignore
    Navigator: ({ children }) => children,
    // @ts-ignore
    Screen: ({ children }) => children,
  })),
  useBottomTabBarHeight: jest.fn(() => 49),
}))

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      // @ts-ignore
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}))

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock")
  Reanimated.default.call = () => {}
  return {
    ...Reanimated,
    FadeIn: {
      delay: jest.fn(() => "FadeIn"),
    },
    FadeOut: "FadeOut",
    FadeInDown: "FadeInDown",
    SlideInDown: {
      delay: jest.fn(() => "SlideInDown"),
    },
    ZoomIn: {
      delay: jest.fn(() => "ZoomIn"),
    },
  }
})

jest.mock("@react-native-community/blur", () => ({
  BlurView: "BlurView",
}))

jest.mock("react-native-linear-gradient", () => "BVLinearGradient")

jest.mock("react-native-youtube", () => "YouTube")
