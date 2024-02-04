import React, { useEffect, useState } from "react"
import { View, TextInput, Keyboard, useColorScheme } from "react-native"
import { FormikErrors, FormikProps, withFormik } from "formik"
import { useTranslation } from "react-i18next"

import i18n from "config/i18n"
import { APP_APPEARANCE_DARK, APP_APPEARANCE_LIGHT } from "config"
import InputError from "components/ui/InputError"
import Button from "components/ui/Button"
import Typography from "components/ui/Typography"
import { EMAIL_REGEX, PASSWORD_LENGTH } from "helpers/validation"
import { LoginFormValues } from "types"
import { loginFormStyles, inputStyles, textStyles } from "styles"
import colors from "styles/colors"

interface FormProps {
  initialValues: LoginFormValues
  isLoading: boolean
  onSubmit: (values: LoginFormValues) => void
}

type Props = FormikProps<LoginFormValues> & FormProps

const LoginForm = ({
  isLoading,
  errors,
  setFieldValue,
  handleSubmit,
}: Props) => {
  const { t } = useTranslation()
  const scheme = useColorScheme()
  const dark = scheme === "dark"

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setVisible(true)
    })
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setVisible(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <View
      style={
        visible
          ? [loginFormStyles.content, loginFormStyles.contentPadding]
          : loginFormStyles.content
      }
    >
      <View style={loginFormStyles.group}>
        <TextInput
          style={[
            loginFormStyles.input,
            dark ? inputStyles.dark : inputStyles.light,
          ]}
          testID="email-input"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          autoFocus={true}
          allowFontScaling={false}
          textContentType="emailAddress"
          placeholder={t("login.form.email.placeholder.title")}
          placeholderTextColor={colors.gray}
          keyboardAppearance={dark ? APP_APPEARANCE_DARK : APP_APPEARANCE_LIGHT}
          onChangeText={(newValue: string) => {
            setFieldValue("email", newValue)
          }}
        />
        <InputError>{errors.email}</InputError>
      </View>
      <View style={loginFormStyles.group}>
        <TextInput
          style={[
            loginFormStyles.input,
            dark ? inputStyles.dark : inputStyles.light,
          ]}
          testID="password-input"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          autoFocus={false}
          allowFontScaling={false}
          secureTextEntry
          textContentType="password"
          placeholder={t("login.form.password.placeholder.title")}
          placeholderTextColor={colors.gray}
          keyboardAppearance={dark ? APP_APPEARANCE_DARK : APP_APPEARANCE_LIGHT}
          onChangeText={(newValue: string) => {
            setFieldValue("password", newValue)
          }}
        />
        <InputError>{errors.password}</InputError>
      </View>
      <View style={loginFormStyles.actions}>
        <Button
          testID="login-button"
          style={
            isLoading
              ? [loginFormStyles.submit, loginFormStyles.disabled]
              : [loginFormStyles.submit]
          }
          disabled={isLoading}
          onPress={handleSubmit}
        >
          <Typography variant="callout" style={textStyles.textDark}>
            {t("login.form.submit.title")}
          </Typography>
        </Button>
      </View>
    </View>
  )
}

const LoginFormWithFormik = withFormik<FormProps, LoginFormValues>({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  handleSubmit: (values, { props: { onSubmit } }) => onSubmit(values),
  validate: (values: LoginFormValues) => {
    const errors: FormikErrors<LoginFormValues> = {}

    const { email, password } = values

    if (!email) {
      errors.email = i18n.t("validation.field.required", {
        field: i18n.t("login.form.email.placeholder.title"),
      })
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = i18n.t("validation.field.invalid", {
        field: i18n.t("login.form.email.placeholder.title"),
      })
    }

    if (!password) {
      errors.password = i18n.t("validation.field.required", {
        field: i18n.t("login.form.password.placeholder.title"),
      })
    } else if (password.length < PASSWORD_LENGTH) {
      errors.password = i18n.t("validation.password.toShort")
    }

    return errors
  },
})(LoginForm)

export default LoginFormWithFormik
