import React from "react"
import {
  TabBar,
  SceneRendererProps,
  NavigationState,
} from "react-native-tab-view"
import { useTheme } from "@react-navigation/native"

import Typography from "components/ui/Typography"
import { navStyles, layoutStyles } from "styles"

const TabsComponent = (
  props: SceneRendererProps & {
    navigationState: NavigationState<{ key: string; title: string }>
  },
) => {
  const { dark } = useTheme()

  const getTextStyle = (focused: boolean) => {
    const baseStyle = [navStyles.title]
    const activeStyle = focused
      ? dark
        ? navStyles.titleActiveDark
        : navStyles.titleActiveLight
      : dark
        ? navStyles.titleDark
        : navStyles.titleLight
    return [...baseStyle, activeStyle]
  }

  return (
    <TabBar
      {...props}
      getLabelText={({ route }) => route.title}
      renderLabel={({ route, focused }) => (
        <Typography style={getTextStyle(focused)} variant="callout">
          {route.title}
        </Typography>
      )}
      indicatorStyle={dark ? navStyles.indicatorDark : navStyles.indicatorLight}
      style={dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard}
    />
  )
}

export default TabsComponent
