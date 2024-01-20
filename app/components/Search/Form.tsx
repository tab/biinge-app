import React, { useCallback } from "react"
import { View, TextInput, useColorScheme } from "react-native"
import { Formik, FormikProps } from "formik"
import { useTranslation } from "react-i18next"

import debounce from "helpers/debounce"
import { SearchFormValues } from "types"
import { searchStyles } from "styles"
import Icon from "components/ui/Icon"
import colors from "styles/colors"

interface FormProps {
  initialValues: SearchFormValues
  onSubmit: (values: SearchFormValues) => void
}

type Props = FormikProps<SearchFormValues> & FormProps

const SearchForm = ({ initialValues, onSubmit }: Props) => {
  const scheme = useColorScheme()
  const { t } = useTranslation()

  const dark = scheme === "dark"

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleQueryChange = useCallback(
    debounce((newValue: string) => {
      onSubmit({ query: newValue ? newValue : "" })
    }, 300),
    [onSubmit],
  )

  return (
    <View style={searchStyles.root}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <View style={searchStyles.content}>
            <Icon name="search" color={colors.gray} size={18} />
            <TextInput
              style={searchStyles.input}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              autoFocus={true}
              allowFontScaling={false}
              clearButtonMode="always"
              placeholder={t("search.form.placeholder.title")}
              placeholderTextColor={colors.gray}
              keyboardAppearance={dark ? "dark" : "light"}
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
