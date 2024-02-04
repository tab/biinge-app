import React, { useCallback } from "react"
import { View, TextInput } from "react-native"
import { Formik, FormikProps } from "formik"
import { useTranslation } from "react-i18next"
import { useTheme } from "@react-navigation/native"

import { APP_APPEARANCE_DARK, APP_APPEARANCE_LIGHT } from "config"
import debounce from "helpers/debounce"
import { SearchFormValues } from "types"
import { searchStyles, layoutStyles } from "styles"
import Icon from "components/ui/Icon"
import colors from "styles/colors"

interface FormProps {
  initialValues: SearchFormValues
  onSubmit: (values: SearchFormValues) => void
}

type Props = FormikProps<SearchFormValues> & FormProps

const SearchForm = ({ initialValues, onSubmit }: Props) => {
  const { t } = useTranslation()
  const { dark } = useTheme()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleQueryChange = useCallback(
    debounce((newValue: string) => {
      onSubmit({ query: newValue ? newValue : "" })
    }, 300),
    [onSubmit],
  )

  return (
    <View
      style={[
        searchStyles.root,
        dark ? layoutStyles.bgDarkCard : layoutStyles.bgLightCard,
      ]}
    >
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <View
            style={[
              searchStyles.content,
              dark ? layoutStyles.bgDark : layoutStyles.bgLight,
            ]}
          >
            <Icon name="search" color={colors.gray} size={18} />
            <TextInput
              style={[
                searchStyles.input,
                dark ? searchStyles.inputDark : searchStyles.inputLight,
              ]}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              autoFocus={true}
              allowFontScaling={false}
              clearButtonMode="always"
              placeholder={t("search.form.placeholder.title")}
              placeholderTextColor={colors.gray}
              keyboardAppearance={
                dark ? APP_APPEARANCE_DARK : APP_APPEARANCE_LIGHT
              }
              value={values.query}
              onChangeText={(newValue: string) => {
                setFieldValue("query", newValue)
                handleQueryChange(newValue)
              }}
            />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default SearchForm
