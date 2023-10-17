import React, { useCallback } from "react"
import { View, TextInput } from "react-native"
import { Formik, FormikProps } from "formik"
import { useTranslation } from "react-i18next"

import debounce from "helpers/debounce"
import { SearchFormValues } from "types"
import { searchFormStyles } from "styles"

interface FormProps {
  initialValues: SearchFormValues
  onSubmit: (values: SearchFormValues) => void
}

type Props = FormikProps<SearchFormValues> & FormProps

const SearchForm = ({ initialValues, onSubmit }: Props) => {
  const { t } = useTranslation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleQueryChange = useCallback(
    debounce((newValue: string) => {
      if (newValue) {
        onSubmit({ query: newValue })
      } else {
        onSubmit({ query: "" })
      }
    }, 300),
    [onSubmit],
  )

  return (
    <View style={searchFormStyles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <>
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              autoFocus={true}
              allowFontScaling={false}
              style={searchFormStyles.input}
              placeholder={t("search.form.placeholder.title")}
              value={values.query}
              onChangeText={(newValue: string) => {
                setFieldValue("query", newValue)
                handleQueryChange(newValue)
              }}
            />
          </>
        )}
      </Formik>
    </View>
  )
}

export default SearchForm
