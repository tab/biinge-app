import React from "react"
import { View } from "react-native"
import { useTheme } from "@react-navigation/native"

import Button from "components/ui/Button"
import Icon from "components/ui/Icon"
import Typography from "components/ui/Typography"
import { menuSectionStyles, textStyles, layoutStyles } from "styles"

type ItemType = {
  id: number
  title: string
  icon: string
  onPress: () => void
}

type Props = {
  items: ItemType[]
}

const MenuSectionComponent = ({ items }: Props) => {
  const { dark } = useTheme()

  return (
    <View
      style={[
        menuSectionStyles.root,
        dark ? layoutStyles.bgDarkSecondCard : layoutStyles.bgLightSecondCard,
      ]}
    >
      {items.map(({ id, title, icon, onPress }: ItemType) => (
        <Button key={id} style={menuSectionStyles.button} onPress={onPress}>
          <Icon
            style={menuSectionStyles.icon}
            name={icon}
            color={
              dark ? textStyles.textDark.color : textStyles.textLight.color
            }
            size={20}
          />
          <Typography
            variant="body"
            style={dark ? textStyles.textDark : textStyles.textLight}
          >
            {title}
          </Typography>
        </Button>
      ))}
    </View>
  )
}

export default MenuSectionComponent
