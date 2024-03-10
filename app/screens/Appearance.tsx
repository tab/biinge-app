import React from "react"
import { View, Image, ImageProps } from "react-native"
import { useUser, useObject, useRealm } from "@realm/react"
import { BSON } from "realm"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import {
  APP_APPEARANCE_SYSTEM,
  APP_APPEARANCE_LIGHT,
  APP_APPEARANCE_DARK,
} from "config"
import { Profile } from "models"
import Button from "components/ui/Button"
import Typography from "components/ui/Typography"
import Icon from "components/ui/Icon"
import { layoutStyles, textStyles, appearanceStyles } from "styles"
import colors from "styles/colors"

type ItemType = {
  id: number
  title: string
  value: string
  active: boolean
  image: ImageProps
}

const AppearanceScreen = () => {
  const realm = useRealm()

  const { t } = useTranslation()
  const { dark } = useTheme()

  const user = useUser()
  const profile = useObject<Profile>(Profile, new BSON.ObjectId(user.id))

  const ITEMS = [
    {
      id: 1,
      title: t("appearance.theme.light.title"),
      value: APP_APPEARANCE_LIGHT,
      active: profile?.appearance === APP_APPEARANCE_LIGHT,
      image: require("../assets/light.png"),
    },
    {
      id: 2,
      title: t("appearance.theme.dark.title"),
      value: APP_APPEARANCE_DARK,
      active: profile?.appearance === APP_APPEARANCE_DARK,
      image: require("../assets/dark.png"),
    },
    {
      id: 3,
      title: t("appearance.theme.system.title"),
      value: APP_APPEARANCE_SYSTEM,
      active: profile?.appearance === APP_APPEARANCE_SYSTEM,
      image: require("../assets/system.png"),
    },
  ]

  const handleClick = (value: string) => {
    realm.write(() => {
      realm.create(
        Profile,
        {
          _id: new BSON.ObjectId(user.id),
          userId: user.id,
          appearance: value,
          updatedAt: new Date(),
        },
        true,
      )
    })
  }

  return (
    <View
      style={[
        appearanceStyles.root,
        dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
      ]}
    >
      <View style={appearanceStyles.content}>
        <Typography
          variant="title1"
          style={dark ? textStyles.textDark : textStyles.textLight}
        >
          {t("appearance.title")}
        </Typography>
        <View style={appearanceStyles.list}>
          {ITEMS.map(({ id, title, value, active, image }: ItemType) => (
            <Button key={id} onPress={() => handleClick(value)}>
              <View style={appearanceStyles.item}>
                <Image style={appearanceStyles.image} source={image} />
                <Typography
                  variant="body"
                  style={
                    dark
                      ? [appearanceStyles.title, textStyles.textDark]
                      : [appearanceStyles.title, textStyles.textLight]
                  }
                >
                  {title}
                </Typography>
                <Icon
                  name={
                    active
                      ? "radio-button-on-outline"
                      : "radio-button-off-outline"
                  }
                  color={dark ? colors.white : colors.black}
                  size={24}
                />
              </View>
            </Button>
          ))}
        </View>
      </View>
    </View>
  )
}

export const APPEARANCE_SCREEN = {
  id: "APPEARANCE_SCREEN",
  name: "com.biinge.Appearance",
}

export default AppearanceScreen
