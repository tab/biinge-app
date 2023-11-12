import React, { useCallback } from "react"
import { View, TextInput, Pressable } from "react-native"
import { Formik, FormikProps } from "formik"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import debounce from "helpers/debounce"
import { SearchFormValues } from "types"
import { searchStyles } from "styles"
import Icon from "components/ui/Icon"
import Typography from "components/ui/Typography"
import colors from "styles/colors"

interface FormProps {
  initialValues: SearchFormValues
  onSubmit: (values: SearchFormValues) => void
}

type Props = FormikProps<SearchFormValues> & FormProps

const SearchForm = ({ initialValues, onSubmit }: Props) => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleQueryChange = useCallback(
    debounce((newValue: string) => {
      onSubmit({ query: newValue ? newValue : "" })
    }, 300),
    [onSubmit],
  )

  const handleClick = () => {
    navigation.goBack()
  }

  return (
    <View style={searchStyles.root}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <>
            <View style={searchStyles.content}>
              <Icon name="search" color={colors.gray} size={18} />
              <TextInput
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                autoFocus={true}
                allowFontScaling={false}
                clearButtonMode="always"
                style={searchStyles.input}
                placeholder={t("search.form.placeholder.title")}
                placeholderTextColor={colors.gray}
                value={values.query}
                onChangeText={(newValue: string) => {
                  setFieldValue("query", newValue)
                  handleQueryChange(newValue)
                }}
              />
            </View>
            <Pressable onPress={handleClick}>
              <Typography variant="body" style={searchStyles.button}>
                {t("search.form.cancel.title")}
              </Typography>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  )
}

export default SearchForm
