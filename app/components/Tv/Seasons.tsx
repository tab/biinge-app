import React from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import { seasonsStyles, layoutStyles } from "styles"
import Typography from "components/ui/Typography"
import List from "components/ui/SeasonsList"
import { TvDetails } from "types"

type Props = {
  show: TvDetails
}

const SeasonsComponent = ({ show }: Props) => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  const { seasons } = show

  const visible = seasons.length > 0

  return (
    <>
      {visible && (
        <View
          style={[
            seasonsStyles.root,
            dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
          ]}
        >
          <Typography variant="callout" style={seasonsStyles.title}>
            {t("tv.content.seasons")}
          </Typography>
          <List show={show} items={seasons} />
        </View>
      )}
    </>
  )
}

export default SeasonsComponent
